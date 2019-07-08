
const boom = require('@hapi/boom');

const {  } = require('../errors');
const {
  getCategories,
  getZones,
  getServices,
  createService
} = require('../controllers/services');
const newServiceScheme = require('../schemes/new-service');

module.exports = [
  {
    method: 'GET',
    path: '/services/categories',
    handler: async (req, h) => {
      return h.response(await getCategories()).code(200);
    }
  },
  {
    method: 'GET',
    path: '/services/zones',
    handler: async (req, h) => {
      return h.response(await getZones()).code(200);
    }
  },
  {
    method: 'GET',
    path: '/services',
    handler: async (req, h) => {
      return h.response(await getServices()).code(200);
    }
  },
  {
    method: 'POST',
    path: '/services',
    options: {
      validate: {
        payload: newServiceScheme
      }
    },
    handler: async (req, h) => {
      try {
        return h.response(await createService(req.payload, req.auth.artifacts.id)).code(201);
      } catch(err) {
        console.log(err);
        throw boom.internal(err);
      }
    }
  }
];
