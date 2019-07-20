
const boom = require('@hapi/boom');

const { USER_NOT_EXIST } = require('../errors');
const {
  getUserBalance,
  getUserHistory
} = require('../controllers/user');

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
    method: 'GET',
    path: '/users/history',
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
