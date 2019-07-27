
const Joi = require('@hapi/joi');
const { PAYMENT_METHODS_TYPES, ACCOUNT_TYPES } = require('../commons');

module.exports = {
  type: Joi.string().valid(PAYMENT_METHODS_TYPES.ACCOUNT, PAYMENT_METHODS_TYPES.CARD).required(),
  cardholderName: Joi.string().when('type', { is: PAYMENT_METHODS_TYPES.CARD, then: Joi.required(), otherwise: Joi.forbidden() }),
  cardNumber: Joi.number().when('type', { is: PAYMENT_METHODS_TYPES.CARD, then: Joi.required(), otherwise: Joi.forbidden() }),
  cardLast4: Joi.number().when('type', { is: PAYMENT_METHODS_TYPES.CARD, then: Joi.required(), otherwise: Joi.forbidden() }),
  cardExpirationMonth: Joi.number().when('type', { is: PAYMENT_METHODS_TYPES.CARD, then: Joi.required(), otherwise: Joi.forbidden() }),
  cardExpirationYear: Joi.number().when('type', { is: PAYMENT_METHODS_TYPES.CARD, then: Joi.required(), otherwise: Joi.forbidden() }),
  cvv: Joi.number().when('type', { is: PAYMENT_METHODS_TYPES.CARD, then: Joi.required(), otherwise: Joi.forbidden() }),

  bankId: Joi.string().when('type', { is: PAYMENT_METHODS_TYPES.ACCOUNT, then: Joi.required(), otherwise: Joi.forbidden() }),
  accountType: Joi.string().valid(ACCOUNT_TYPES.SAVING, ACCOUNT_TYPES.CHECKING).when('type', { is: PAYMENT_METHODS_TYPES.ACCOUNT, then: Joi.required(), otherwise: Joi.forbidden() }),
  accountNumber: Joi.number().when('type', { is: PAYMENT_METHODS_TYPES.ACCOUNT, then: Joi.required(), otherwise: Joi.forbidden() })
};
