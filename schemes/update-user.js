
const Joi = require('@hapi/joi');

module.exports = {
  firstName: Joi.string().alphanum().min(3).max(30),
  middleName: Joi.string().alphanum().min(3).max(30),
  lastName: Joi.string().alphanum().min(3).max(30),
  secondSurname: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().min(8).max(16),
  email: Joi.string().email({ minDomainSegments: 2 }),
};
