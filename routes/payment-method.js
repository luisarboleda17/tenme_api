
const boom = require('@hapi/boom');

const { PAYMENT_METHODS_TYPES } = require('../commons');
const { getPaymentMethods, addPaymentMethod } = require('../controllers/payment-method');
const addCreditCardScheme = require('../schemes/add-credit-card');
const addBankAccountScheme = require('../schemes/add-bank-account');

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
    path: '/payment-methods/credit-cards',
    options: {
      validate: {
        payload: addCreditCardScheme
      }
    },
    handler: async (req, h) => {
      try {
        req.payload.type = PAYMENT_METHODS_TYPES.CARD;
        return h.response(await addPaymentMethod(req.payload, req.auth.artifacts.id)).code(201);
      } catch(err) {
        console.log(err);
        throw boom.internal(err);
      }
    }
  },
  {
    method: 'POST',
    path: '/payment-methods/bank-accounts',
    options: {
      validate: {
        payload: addBankAccountScheme
      }
    },
    handler: async (req, h) => {
      try {
        req.payload.type = PAYMENT_METHODS_TYPES.ACCOUNT;
        return h.response(await addPaymentMethod(req.payload, req.auth.artifacts.id)).code(201);
      } catch(err) {
        console.log(err);
        throw boom.internal(err);
      }
    }
  }
];
