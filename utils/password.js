
const bcrypt = require('bcrypt');

const { PASSWORD_SALT_ROUNDS } = require('../commons');

// TODO: Add public / private encryption password

/**
 * Encrypt password to database
 * @param password
 * @returns {*}
 */
const encryptPassword = password => bcrypt.hash(password, PASSWORD_SALT_ROUNDS);

/**
 * Compare password against database password
 * @param password
 * @param dbPassword
 * @returns {*}
 */
const comparePassword = (password, dbPassword) => bcrypt.compare(password, dbPassword);

module.exports = {
  encryptPassword,
  comparePassword
};
