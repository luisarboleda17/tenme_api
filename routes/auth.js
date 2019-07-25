
const boom = require('@hapi/boom');

const { USER_EXIST, WRONG_PASSWORD, USER_NOT_EXIST } = require('../errors');
const {
  signUp,
  loginWithCredentials,
  loginWithFacebook,
  checkUserExistence
} = require('../controllers/auth');
const newUserScheme = require('../schemes/new-user');
const loginScheme = require('../schemes/login');
const userExistenceScheme = require('../schemes/user-existence');

module.exports = [
  {
    method: 'POST',
    path: '/auth/signup',
    options: {
      validate: {
        payload: newUserScheme
      },
      auth: false
    },
    handler: async (req, h) => {
      const userData = req.payload;
      try {
        return h.response(await signUp(userData)).code(201);
      } catch(err) {
        if (err instanceof USER_EXIST) {
          throw boom.conflict(err);
        } else {
          console.log(err);
          throw boom.internal(err);
        }

      }
    }
  },
  {
    method: 'POST',
    path: '/auth/login',
    options: {
      validate: {
        payload: loginScheme
      },
      auth: false
    },
    handler: async (req, h) => {
      try {
        if (req.payload.facebookId) {
          return h.response(await loginWithFacebook(req.payload.facebookId)).code(200);
        } else {
          return h.response(await loginWithCredentials(req.payload.phone, req.payload.password)).code(200);
        }
      } catch(err) {
        if (err instanceof WRONG_PASSWORD) {
          throw boom.badRequest(err);
        } else if (err instanceof USER_NOT_EXIST) {
          throw boom.notFound(err);
        } else {
          console.log(err);
          throw boom.internal(err);
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/auth/check',
    options: {
      validate: {
        query: userExistenceScheme
      },
      auth: false
    },
    handler: async (req, h) => {
      try {
        return h.response({
          exist: await checkUserExistence(req.query.phone, req.query.facebookId)
        }).code(200);
      } catch(err) {
        console.log(err);
        throw boom.internal(err);
      }
    }
  }
];
