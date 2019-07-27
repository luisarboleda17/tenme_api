
const { category: Category, zone: Zone, service: Service, user: User, history: History, serviceRequest: ServiceRequest } = require('../models');
const { getService } = require('../services/service');
const { addServiceRequest, addServiceCreated, incrementBalance } = require('../services/user');

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
 * @param requiredDays
 * @returns {Promise<any>}
 */
const requestService = (id, userId, requiredDays) => new Promise(
  async (resolve, reject) => {
    try {
      const totalHours = requiredDays.reduce(
        (prev, hourRange) => {
          return prev + Math.ceil((hourRange.endHour - hourRange.startHour) / 3600000)
        },
        0
      );
      const service = await getService(id);
      const totalPrice = service.hourlyRate * totalHours;

      const serviceRequest = new ServiceRequest({
        service: id,
        requestedDays: requiredDays,
        hours: totalHours,
        totalPrice,
        user: userId
      });

      await serviceRequest.save();
      await addServiceRequest(userId, id);

      await incrementBalance(userId, -1 * totalPrice);

      await History({
        user: userId,
        type: 'requested_service',
        service: id
      }).save();

      resolve();
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
