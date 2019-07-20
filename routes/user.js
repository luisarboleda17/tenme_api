
const boom = require('@hapi/boom');

const { USER_NOT_EXIST } = require('../errors');
const {
  getUserBalance,
  getUserHistory,
  updateUserInfo
} = require('../controllers/user');
const updateUserScheme = require('../schemes/update-user');

module.exports = [
  {
    method: 'GET',
    path: '/users/me/balance',
    handler: async (req, h) => {
      try {
        return h.response(await getUserBalance(req.auth.artifacts.id)).code(200);
      } catch(err) {
        if (err instanceof USER_NOT_EXIST) {
          throw boom.notFound(err);
        } else {
          console.log(err);
          throw boom.internal(err);
        }
      }
    }
  },
  {
    method: 'PATCH',
    path: '/users/me',
    options: {
      validate: {
        payload: updateUserScheme
      }
    },
    handler: async (req, h) => {
      try {
        return h.response(await updateUserInfo(req.auth.artifacts.id, req.payload)).code(200);
      } catch(err) {
        if (err instanceof USER_NOT_EXIST) {
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
    path: '/users/me/history',
    handler: async (req, h) => {
      try {
        return h.response(await getUserHistory(req.auth.artifacts.id)).code(200);
      } catch(err) {
        console.log(err);
        throw boom.internal(err);
      }
    }
  }
];
