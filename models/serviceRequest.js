
const _ = require('lodash');

module.exports = (mongoose, options) => {
  const Schema = mongoose.Schema;

  const dayScheme = [{
    startHour: { type: Number, required: true },
    endHour: { type: Number, required: true }
  }];

  const serviceRequestSchema = new Schema(
    {
      service: { type: Schema.ObjectId, ref: 'service' },
      requestedDays: dayScheme,
      hours: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
      user: { type: Schema.ObjectId, ref: 'user', trim: true, index: true, sparse: true, },
    },
    options
  );

  return mongoose.model('serviceRequest', serviceRequestSchema);
};
