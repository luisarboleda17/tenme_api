
const Mongoose = require('mongoose');

const modelOptions = {
  id: true,
  minimize: true,
  strict: true,
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
};

module.exports = {
  user: require('./user')(Mongoose, modelOptions),
  category: require('./category')(Mongoose, modelOptions),
  zone: require('./zone')(Mongoose, modelOptions),
  service: require('./service')(Mongoose, modelOptions),
  bank: require('./bank')(Mongoose, modelOptions),
  credit: require('./credit')(Mongoose, modelOptions),
  history: require('./history')(Mongoose, modelOptions)
};
