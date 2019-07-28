
const Joi = require('@hapi/joi');
const { ACCOUNT_TYPES } = require('../commons');

module.exports = {
  bankId: Joi.string().required(),
  accountType: Joi.string().valid(ACCOUNT_TYPES.SAVING, ACCOUNT_TYPES.CHECKING).required(),
  accountNumber: Joi.number().required()
};
