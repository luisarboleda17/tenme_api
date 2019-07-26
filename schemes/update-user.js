
const Joi = require('@hapi/joi');

module.exports = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30),
  middleName: Joi.string().alphanum().min(3).max(30),
  lastName: Joi.string().alphanum().min(3).max(30),
  secondSurname: Joi.string().alphanum().min(3).max(30),
  password: Joi.object({
    old: Joi.string().required(),
    'new': Joi.string().required()
  }),
  email: Joi.string().email({ minDomainSegments: 2 }),
}).min(1);
