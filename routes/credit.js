
const boom = require('@hapi/boom');

const { requestCredit } = require('../controllers/credit');
const requestCreditScheme = require('../schemes/request-credit');

module.exports = [
  {
    method: 'POST',
    path: '/credit',
    options: {
      validate: {
        payload: requestCreditScheme
      }
    },
    handler: async (req, h) => {
      try {
        return h.response(await requestCredit(req.payload, req.auth.artifacts.id)).code(201);
      } catch(err) {
        console.log(err);
        throw boom.internal(err);
      }
    }
  }
];
