
const { category: Category, zone: Zone, service: Service, user: User, history: History } = require('../models');
const { getService } = require('../services/service');
const { addServiceRequest, addServiceCreated } = require('../services/user');

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
    ).populate('zone')
      .populate('category')
      .populate(
        'user',
        ['id', 'score', 'documentPhotoUrl', 'firstName', 'lastName', 'fullName']
      );
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
      data.user = userId;

      let service = new Service(data);
      const saved = await service.save();

      await addServiceCreated(userId, service.id);

      await History({
        user: userId,
        type: 'offered_service',
        service: service.id
      }).save();

      resolve(saved);
    } catch(err) {
      reject(err);
    }
  }
);

/**
 * Get service by its id
 * @type {Promise<any>|*}
 */
const getServiceById = id => getService(id);

/**
 * Request service
 * @param id
 * @param userId
 * @returns {Promise<any>}
 */
const requestService = (id, userId) => new Promise(
  async (resolve, reject) => {
    try {
      const request = await addServiceRequest(userId, id);

      await History({
        user: userId,
        type: 'requested_service',
        service: service.id
      }).save();

      resolve(request);
    } catch (err) {
      reject(err);
    }
  }
);

module.exports = {
  getCategories,
  getZones,
  getServices,
  createService,
  getServiceById,
  requestService
};
