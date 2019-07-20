


const { user: User, history: History } = require('../models');
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

/**
 * Get user's history
 * @param userId
 * @returns {Promise<any>}
 */
const getUserHistory = userId => new Promise(
  (resolve, reject) => {
    History.find(
      {
        user: userId
      },
      (err, histories) => {
        if (err) { return reject(err); }
        resolve(histories || []);
      }
    ).populate('service').populate('credit');
  }
);

module.exports = {
  getUserBalance,
  getUserHistory
};
