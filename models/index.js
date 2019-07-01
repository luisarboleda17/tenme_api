
const Mongoose = require('mongoose');

const modelOptions = {
  id: true,
  minimize: true,
  strict: true,
  timestamps: true,
};

module.exports = {
  user: require('./user')(Mongoose, modelOptions)
};
