
const Joi = require('@hapi/joi');

module.exports = {
  phone: Joi.number(),
  password: Joi.string().min(8).max(16).when('phone', { is: Joi.exist(), then: Joi.required(), otherwise: Joi.optional() }),
  facebookId: Joi.string().when('phone', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() })
};
