
const { user: User } = require('../models');
const { password } = require('../utils');
const { checkUserExist } = require('../services/user');
const { USER_EXIST } = require('../errors');

const loginWithFacebook = (facebookId, email) => {

};

const loginWithCredentials = (phone, password) => new Promise(
  (resolve, reject) => {
    try {

    } catch(err) {
      console.error(err);
      reject(err);
    }
  }
);

/**
 * Sign up user to database
 * @param data
 * @returns {Promise<any>}
 */
const signUp = data => new Promise(
  async (resolve, reject) => {
    try {
      const completePhone = parseInt(data.phone.countryCode.toString() + data.phone.phoneNumber.toString(), 10);

      if (!(await checkUserExist(completePhone, data.facebookId))) {
        if (data.password) {
          data.password = await password.encryptPassword(data.password);
        }
        data.completePhone = completePhone;
        const newUser = new User(data);
        resolve(await newUser.save());
      } else {
        reject(new USER_EXIST());
      }
    } catch(err) {
      console.error(err);
      reject(err);
    }
  }
);

module.exports = {
  loginWithCredentials,
  loginWithFacebook,
  signUp
};
