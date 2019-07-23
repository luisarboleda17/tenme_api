
const Joi = require('@hapi/joi');

module.exports = {
  phone: Joi.number().required()
};
