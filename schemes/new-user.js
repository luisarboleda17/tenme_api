
const Joi = require('@hapi/joi');

module.exports = {
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  middleName: Joi.string().alphanum().min(3).max(30),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  secondSurname: Joi.string().alphanum().min(3).max(30),
  document: Joi.object({
    id: Joi.string().required(),
    type: Joi.string().valid('id', 'passport').required()
  }).required(),
  phone: Joi.object({
    countryCode: Joi.number().required(),
    phoneNumber: Joi.number().required()
  }).required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  bankInfo: Joi.object({
    bankId: Joi.string().required(),
    accountType: Joi.string().valid('saving','checking').required(),
    number: Joi.number().required()
  }).required(),
  apcAllowed: Joi.boolean().required(),
  facebookId: Joi.number(),
  documentPhotoUrl: Joi.string().required(),
  password: Joi.string().min(8).max(16).when('facebookId', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() })
};
