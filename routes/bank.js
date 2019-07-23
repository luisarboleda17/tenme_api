
const boom = require('@hapi/boom');

const {
  getBanks
} = require('../controllers/bank');

module.exports = [
  {
    method: 'GET',
    path: '/banks',
    options: {
      auth: false
    },
    handler: async (req, h) => {
      return h.response(await getBanks()).code(200);
    }
  }
];
