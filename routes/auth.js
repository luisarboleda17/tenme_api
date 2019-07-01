
const boom = require('@hapi/boom');

const { USER_EXIST, WRONG_PASSWORD, USER_NOT_EXIST } = require('../errors');
const {
  signUp,
  loginWithCredentials,
  loginWithFacebook
} = require('../controllers/auth');
const newUserScheme = require('../schemes/new-user');
const loginScheme = require('../schemes/login');

module.exports = [
  {
    method: 'POST',
    path: '/signup',
    options: {
      validate: {
        payload: newUserScheme
      }
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
    path: '/login',
    options: {
      validate: {
        payload: loginScheme
      }
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
  }
];
