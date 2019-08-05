
const Joi = require('@hapi/joi');

module.exports = {
  totalHours: Joi.number().required()
};
