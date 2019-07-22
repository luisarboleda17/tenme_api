
module.exports = [
  {
    method: 'GET',
    path: '/',
    options: {
      auth: false
    },
    handler: async (req, h) => {
      return h.response({
        status: 'Tenme API'
      }).code(200);
    }
  }
];
