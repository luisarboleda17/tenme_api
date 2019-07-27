
const Joi = require('@hapi/joi');
const { PAYMENT_METHODS_TYPES, ACCOUNT_TYPES } = require('../commons');

module.exports = {
  type: Joi.string().valid(...PAYMENT_METHODS_TYPES).required(),
  cardholderName: Joi.string().when('type', { is: 'card', then: Joi.required(), otherwise: Joi.optional() }),
  cardNumber: Joi.number().when('type', { is: 'card', then: Joi.required(), otherwise: Joi.optional() }),
  cardLast4: Joi.number().when('type', { is: 'card', then: Joi.required(), otherwise: Joi.optional() }),
  cardExpirationMonth: Joi.number().when('type', { is: 'card', then: Joi.required(), otherwise: Joi.optional() }),
  cardExpirationYear: Joi.number().when('type', { is: 'card', then: Joi.required(), otherwise: Joi.optional() }),
  cvv: Joi.number().when('type', { is: 'card', then: Joi.required(), otherwise: Joi.optional() }),

  bankId: Joi.string().when('type', { is: 'account', then: Joi.required(), otherwise: Joi.optional() }),
  accountType: Joi.string().valid(...ACCOUNT_TYPES).when('type', { is: 'account', then: Joi.required(), otherwise: Joi.optional() }),
  accountNumber: Joi.number().when('type', { is: 'account', then: Joi.required(), otherwise: Joi.optional() })
};
