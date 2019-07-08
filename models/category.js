
module.exports = (mongoose, options) => {
  const Schema = mongoose.Schema;

  const categorySchema = new Schema(
    {
      name: { type: String, required: true, trim: true }
    },
    options
  );
  return mongoose.model('category', categorySchema);
};
