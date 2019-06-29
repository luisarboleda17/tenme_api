
const { user } = require('../models');
const sha1Parser = require('../utils/sha1');

const loginWithFacebook = (facebookId, email) => {

};

const loginWithCredentials = (phone, password) => new Promise(
  (resolve, reject) => {
    resolve();
  }
);

const signUp = data => new Promise(
  async (resolve, reject) => {
    try {
      data.completePhone = parseInt(data.phone.countryCode.toString() + data.phone.phoneNumber.toString(), 10);
      const newUser = new user(data);
      resolve(await newUser.save());
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
