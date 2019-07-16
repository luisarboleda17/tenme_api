
module.exports = (mongoose, options) => {
  const Schema = mongoose.Schema;

  const bankSchema = new Schema(
    {
      name: { type: String, required: true, trim: true }
    },
    options
  );
  return mongoose.model('bank', bankSchema);
};
