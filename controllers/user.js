
const { user: User } = require('../models');
const { USER_NOT_EXIST } = require('../errors');

/**
 * Get user's balance
 * @param userId
 * @returns {Promise<any>}
 */
const getUserBalance = userId => new Promise(
  (resolve, reject) => {
    User.findById(
      { _id: userId },
      'balance',
      (err, user) => {
        if (err) { return reject(err); }
        if (user) {
          resolve({ balance: user.balance });
        } else {
          reject(new USER_NOT_EXIST());
        }
      }
    );
  }
);

module.exports = {
  getUserBalance
};
