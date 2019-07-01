
const boom = require('@hapi/boom');
const { USER_EXIST } = require('../errors');

const {
  signUp,
  loginWithCredentials
} = require('../controllers/auth');
const newUserScheme = require('../schemes/new-user');

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
        await signUp(userData);
        return h.response().code(201);
      } catch(err) {
        if (err instanceof USER_EXIST) {
          throw boom.conflict(err);
        } else {
          console.log(err);
          throw boom.internal(err);
        }

      }
    }
  }
];
