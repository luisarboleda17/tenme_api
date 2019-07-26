
const _ = require('lodash');

const { user: User, history: History } = require('../models');
const { USER_NOT_EXIST, WRONG_PASSWORD } = require('../errors');
const { updateUser, getUser } = require('../services/user');
const { encryptPassword, comparePassword } = require('../utils/password');

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
const updateUserInfo = (userId, newData) => new Promise(
  async (resolve, reject) => {
    try {
      if (newData.password) {
        const user = await getUser({_id: userId});

        if (await comparePassword(newData.password.old, user.password)) {
          newData.password = await encryptPassword(newData.password.new);
          const user = await updateUser(userId, newData);
          resolve(_.pick(user, ['firstName', 'lastName', 'email']));
        } else {
          reject(new WRONG_PASSWORD());
        }
      } else {
        const user = await updateUser(userId, newData);
        resolve(_.pick(user, ['firstName', 'lastName', 'email']));
      }
    } catch (err) {
      reject(err);
    }
  }
);

module.exports = {
  getUserBalance,
  getUserHistory,
  updateUserInfo
};
