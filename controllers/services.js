
const { category: Category, zone: Zone, service: Service } = require('../models');
const {  } = require('../utils');
const {  } = require('../services/user');
const {  } = require('../errors');

/**
 * Get all categories
 * @returns {Promise<any>}
 */
const getCategories = () => new Promise(
  (resolve, reject) => {
    Category.find(
      {},
      (err, categories) => {
        if (err) { return reject(err); }
        resolve(categories);
      }
    );
  }
);

/**
 * Get all zones
 * @returns {Promise<any>}
 */
const getZones = () => new Promise(
  (resolve, reject) => {
    Zone.find(
      {},
      (err, categories) => {
        if (err) { return reject(err); }
        resolve(categories);
      }
    );
  }
);

/**
 * Get all services
 * @returns {Promise<any>}
 */
const getServices = () => new Promise(
  (resolve, reject) => {
    Service.find(
      {},
      (err, services) => {
        if (err) { return reject(err); }
        resolve(services);
      }
    ).populate('zoneId').populate('categoryId').populate('userId');
  }
);

/**
 * Create new service
 * @param data
 * @param userId
 * @returns {Promise<any>}
 */
const createService = (data, userId) => new Promise(
  async (resolve, reject) => {
    try {
      data.userId = userId;

      let service = new Service(data);
      resolve(await service.save());
    } catch(err) {
      reject(err);
    }
  }
);

module.exports = {
  getCategories,
  getZones,
  getServices,
  createService
};
