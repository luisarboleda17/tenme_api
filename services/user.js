
const { user: User } = require('../models');

/**
 * Check if user exist on database
 * @param completePhone
 * @param facebookId
 * @returns {Promise<any>}
 */
const checkUserExist = (completePhone, facebookId) => new Promise(
  (resolve, reject) => {
    const queryParams = {
      $or: [
        { completePhone: completePhone },
      ]
    };
    if (facebookId) {
      queryParams.$or.push({ facebookId: facebookId });
    }

    User.findOne(
      queryParams,
      (err, user) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(!!(user));
        }
      }
    );
  }
);

module.exports = {
  checkUserExist
};
