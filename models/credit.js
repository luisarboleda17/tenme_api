
module.exports = (mongoose, options) => {
  const Schema = mongoose.Schema;

  const serviceSchema = new Schema(
    {
      user: { type: Schema.ObjectId, ref: 'user', required: true },
      amount: { type: Number, required: true },
      paymentMethod: { type: Schema.ObjectId, ref: 'paymentMethod' },
      interestRate: { type: Number, required: true },
      firstPaymentDate: { type: Date, required: true },
      payWithService: { type: Boolean },
      approved: { type: Boolean, required: true },
      isCredit: { type: Boolean, required: true },
    },
    options
  );

  return mongoose.model('credit', serviceSchema);
};
