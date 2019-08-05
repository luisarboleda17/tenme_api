
const _ = require('lodash');

module.exports = (mongoose, options) => {
  const Schema = mongoose.Schema;

  const dayScheme = [{
    startHour: { type: Number, required: true },
    endHour: { type: Number, required: true }
  }];

  const serviceSchema = new Schema(
    {
      zone: { type: Schema.ObjectId, ref: 'zone' },
      category: { type: Schema.ObjectId, ref: 'category' },
      hourlyRate: { type: Number, required: true },
      weeklyAvailability: {
        monday: dayScheme,
        tuesday: dayScheme,
        wednesday: dayScheme,
        thursday: dayScheme,
        friday: dayScheme,
        saturday: dayScheme,
        sunday: dayScheme,
      },
      user: { type: Schema.ObjectId, ref: 'user', trim: true, index: true, sparse: true, },
    },
    options
  );

  return mongoose.model('service', serviceSchema);
};
