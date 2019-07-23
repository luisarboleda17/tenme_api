
const _ = require('lodash');

module.exports = (mongoose, options) => {
  const Schema = mongoose.Schema;

  const serviceSchema = new Schema(
    {
      zone: { type: Schema.ObjectId, ref: 'zone' },
      category: { type: Schema.ObjectId, ref: 'category' },
      dailyHours: { type: Number, required: true },
      hourlyRate: { type: Number, required: true },
      weeklyAvailability: {
        monday: { type: Boolean, required: true },
        tuesday: { type: Boolean, required: true },
        wednesday: { type: Boolean, required: true },
        thursday: { type: Boolean, required: true },
        friday: { type: Boolean, required: true },
        saturday: { type: Boolean, required: true },
        sunday: { type: Boolean, required: true },
      },
      user: { type: Schema.ObjectId, ref: 'user', trim: true, index: true, sparse: true, },
    },
    options
  );

  return mongoose.model('service', serviceSchema);
};
