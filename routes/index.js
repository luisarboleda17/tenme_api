
module.exports = [
  ...require('./auth'),
  ...require('./services'),
  ...require('./user'),
  ...require('./bank'),
  ...require('./credit'),
  ...require('./check'),
  ...require('./payment-method')
];
