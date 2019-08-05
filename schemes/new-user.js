
const Joi = require('@hapi/joi');

module.exports = {
  firstName: Joi.string().required(),
  middleName: Joi.string(),
  lastName: Joi.string().required(),
  secondSurname: Joi.string(),
  document: Joi.object({
    id: Joi.string().required(),
    type: Joi.string().valid('id', 'passport').required()
  }).required(),
  phone: Joi.object({
    countryCode: Joi.number().required(),
    phoneNumber: Joi.number().required()
  }).required(),
  email: Joi.string(),
  apcAllowed: Joi.boolean().required(),
  facebookId: Joi.string(),
  documentPhotoUrl: Joi.string(),
  password: Joi.string().when('facebookId', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() })
};
