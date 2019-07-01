
const { user: User } = require('../models');
const { password: { encryptPassword, comparePassword }, auth: { createToken } } = require('../utils');
const { checkUserExist, getUser, updateLogin } = require('../services/user');
const { USER_EXIST, WRONG_PASSWORD } = require('../errors');

const loginWithFacebook = (facebookId, email) => {

};

/**
 * Login with credentials
 * @param phone
 * @param password
 * @returns {Promise<any>}
 */
const loginWithCredentials = (phone, password) => new Promise(
  async (resolve, reject) => {
    try {
      let user = await getUser({ completePhone: phone });

      if (await comparePassword(password, user.password)) {
        const token = await createToken(user);
        user = await updateLogin(user.id, token);
        resolve({
          token,
          user,
        });
      } else {
        reject(new WRONG_PASSWORD());
      }
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
          data.password = await encryptPassword(data.password);
        }
        data.completePhone = completePhone;

        let newUser = new User(data);
        await newUser.save();

        const token = await createToken(newUser);
        newUser = await updateLogin(newUser.id, token);
        resolve({
          token,
          user: newUser,
        });
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
