
const jwt = require('jsonwebtoken');

const { APP_NAME, DEFAULT_TOKEN_KEY, DEFAULT_TOKEN_EXPIRATION } = require('../commons');


/**
 * Create token for user
 * @param user
 * @returns {Promise<any>}
 */
const createToken = (user) => new Promise(
  (resolve, reject) => {
    const payload = {
      id: user.id,
    };
    const options = {
      algorithm: 'HS256',
      expiresIn: DEFAULT_TOKEN_EXPIRATION,
      audience: APP_NAME,
      issuer: APP_NAME,
    };

    jwt.sign(
      payload,
      DEFAULT_TOKEN_KEY,
      options,
      (err, token) => {
        if (err) { return reject(err); }
        resolve(token);
      }
    );
  }
);

module.exports = {
  createToken
};
