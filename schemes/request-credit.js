
const Joi = require('@hapi/joi');

module.exports = {
  amount: Joi.number().required(),
  paymentMethod: Joi.string(),
  payWithService: Joi.boolean().when('paymentMethod', { is: Joi.exist(), then: Joi.forbidden(), otherwise: Joi.required() }),
  isCredit: Joi.boolean().required()
};
