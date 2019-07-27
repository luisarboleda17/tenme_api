
const boom = require('@hapi/boom');

const { getPaymentMethods, addPaymentMethod } = require('../controllers/payment-method');
const addPaymentMethodScheme = require('../schemes/add-payment-method');

module.exports = [
  {
    method: 'GET',
    path: '/payment-methods',
    handler: async (req, h) => {
      try {
        return h.response(await getPaymentMethods(req.auth.artifacts.id)).code(200);
      } catch(err) {
        console.log(err);
        throw boom.internal(err);
      }
    }
  },
  {
    method: 'POST',
    path: '/payment-methods',
    options: {
      validate: {
        payload: addPaymentMethodScheme
      }
    },
    handler: async (req, h) => {
      try {
        return h.response(await addPaymentMethod(req.payload, req.auth.artifacts.id)).code(201);
      } catch(err) {
        console.log(err);
        throw boom.internal(err);
      }
    }
  }
];
