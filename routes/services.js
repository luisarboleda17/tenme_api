
const boom = require('@hapi/boom');

const {  } = require('../errors');
const {
  getCategories,
  getZones,
  getServices
} = require('../controllers/services');
// const newUserScheme = require('../schemes/new-user');

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
  }
];
