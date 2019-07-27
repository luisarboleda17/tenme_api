
const Joi = require('@hapi/joi');

const dayScheme = Joi.array().items(Joi.object({
  startHour: Joi.number().required(),
  endHour: Joi.number().required()
})).required();

module.exports = {
  zone: Joi.string().required(),
  category: Joi.string().required(),
  hourlyRate: Joi.number().required(),
  weeklyAvailability: {
    monday: dayScheme,
    tuesday: dayScheme,
    wednesday: dayScheme,
    thursday: dayScheme,
    friday: dayScheme,
    saturday: dayScheme,
    sunday: dayScheme,
  }
};
