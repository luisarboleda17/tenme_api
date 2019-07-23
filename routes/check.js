
module.exports = [
  {
    method: 'GET',
    path: '/',
    options: {
      auth: false
    },
    handler: async (req, h) => {
      return h.response({
        name: 'Tenme API'
      }).code(200);
    }
  }
];
