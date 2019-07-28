
const Joi = require('@hapi/joi');

module.exports = {
  cardholderName: Joi.string().required(),
  cardNumber: Joi.number().min(4).required(),
  cardExpirationMonth: Joi.number().required(),
  cardExpirationYear: Joi.number().required(),
  cvv: Joi.number().required()
};
