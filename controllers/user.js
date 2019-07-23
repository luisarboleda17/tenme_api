


const { user: User, history: History } = require('../models');
const { USER_NOT_EXIST } = require('../errors');
const { updateUser } = require('../services/user');

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
    ).populate({
      path: 'service',
      populate: { path: 'zone' }
    }).populate('credit');
  }
);

/**
 * Update user information
 * @param userId
 * @param newData
 * @returns {Promise<any>|*}
 */
const updateUserInfo = (userId, newData) => updateUser(userId, newData);

module.exports = {
  getUserBalance,
  getUserHistory,
  updateUserInfo
};
