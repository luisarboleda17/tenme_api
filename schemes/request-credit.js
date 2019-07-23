
const Joi = require('@hapi/joi');

module.exports = {
  amount: Joi.number().required(),
  paymentMethod: Joi.string().valid('services', 'bank_account').required()
};
