
const { user: User } = require('../models');
const { USER_NOT_EXIST } = require('../errors');

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

/**
 * Get user with query params
 * @param params
 * @returns {Promise<any>}
 */
const getUser = (params) => new Promise(
  (resolve, reject) => {
    User.findOne(
      params,
      (err, user) => {
        if (err) {
          reject(err);
        } else {
          if (user) {
            resolve(user);
          } else {
            reject(new USER_NOT_EXIST());
          }
        }
      }
    );
  }
);

/**
 * Update user token and registered date
 * @param id
 * @param token
 * @returns {Promise<any>}
 */
const updateLogin = (id, token) => new Promise(
  (resolve, reject) => {
    User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        accessToken: token,
        registeredAt: new Date().getTime()
      },
      {
        new: true,
        upsert: false,
      },
      (err, user) => {
        if (err) {
          reject(err);
        } else {
          if (user) {
            resolve(user);
          } else {
            reject(new USER_NOT_EXIST());
          }
        }
      }
    );
  }
);

/**
 * Add requested service to user
 * @param userId
 * @param serviceId
 * @returns {Promise<any>}
 */
const addServiceRequest = (userId, serviceId) => new Promise(
  (resolve, reject) => {
    User.findByIdAndUpdate(
      userId,
      {
        $push: {
          requestedServices: serviceId
        }
      },
      {
        new: true,
        upsert: false
      },
      (err, service) => {
        if (err) { return reject(err); }
        if (service) {
          resolve();
        } else {
          reject(new USER_NOT_EXIST());
        }
      }
    );
  }
);

module.exports = {
  checkUserExist,
  getUser,
  updateLogin,
  addServiceRequest
};
