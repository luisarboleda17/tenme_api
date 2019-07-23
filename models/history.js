
module.exports = (mongoose, options) => {
  const Schema = mongoose.Schema;

  const historySchema = new Schema(
    {
      user: { type: Schema.ObjectId, ref: 'user', required: true, index: true },
      type: { type: String, required: true, enum: ['requested_service', 'offered_service', 'requested_credit'] },
      service: { type: Schema.ObjectId, ref: 'service' },
      credit: { type: Schema.ObjectId, ref: 'credit' }
    },
    options
  );

  return mongoose.model('history', historySchema);
};
