
const jwt = require('jsonwebtoken');

const { APP_NAME, DEFAULT_SIGN_TOKEN_KEY } = require('../commons');


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
      algorithm: 'RS256',
      audience: APP_NAME,
      issuer: APP_NAME,
    };

    jwt.sign(
      payload,
      DEFAULT_SIGN_TOKEN_KEY,
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
