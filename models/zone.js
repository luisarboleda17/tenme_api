
module.exports = (mongoose, options) => {
  const Schema = mongoose.Schema;

  const zoneSchema = new Schema(
    {
      name: { type: String, required: true, trim: true }
    },
    options
  );
  return mongoose.model('zone', zoneSchema);
};
