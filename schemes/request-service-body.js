
const Joi = require('@hapi/joi');

module.exports = Joi.array().items(Joi.object({
  startHour: Joi.number().required(),
  endHour: Joi.number().required()
})).required();
