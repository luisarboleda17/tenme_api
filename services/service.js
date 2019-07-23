
const { service: Service } = require('../models');
const { SERVICE_NOT_EXIST } = require('../errors');

/**
 * Get service with id
 * @param id
 * @returns {Promise<any>}
 */
const getService = (id) => new Promise(
  (resolve, reject) => {
    Service.findById(
      id,
      (err, service) => {
        if (err) { return reject(err); }
        if (service) {
          resolve(service);
        } else {
          reject(new SERVICE_NOT_EXIST());
        }
      }
    );
  }
);

module.exports = {
  getService
};
