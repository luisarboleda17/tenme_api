
const Joi = require('@hapi/joi');

module.exports = {
  dailyHours: Joi.number().required(),
  hourlyRate: Joi.number().required(),
  days: Joi.number().required()
};
