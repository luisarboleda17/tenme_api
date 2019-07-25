
const Joi = require('@hapi/joi');

module.exports = Joi.object({
  phone: Joi.number(),
  facebookId: Joi.string()
}).min(1);
