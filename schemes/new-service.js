
const Joi = require('@hapi/joi');

module.exports = {
  zone: Joi.string().required(),
  category: Joi.string().required(),
  dailyHours: Joi.number().required(),
  hourlyRate: Joi.number().required(),
  weeklyAvailability: {
    monday: Joi.boolean().required(),
    tuesday: Joi.boolean().required(),
    wednesday: Joi.boolean().required(),
    thursday: Joi.boolean().required(),
    friday: Joi.boolean().required(),
    saturday: Joi.boolean().required(),
    sunday: Joi.boolean().required(),
  }
};
