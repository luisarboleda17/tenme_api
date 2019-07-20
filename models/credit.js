
module.exports = (mongoose, options) => {
  const Schema = mongoose.Schema;

  const serviceSchema = new Schema(
    {
      user: { type: Schema.ObjectId, ref: 'user', required: true },
      amount: { type: Number, required: true },
      paymentMethod: { type: String, required: true, enum: ['bank_account', 'services'] },
      interestRate: { type: Number, required: true },
      firstPaymentDate: { type: Date, required: true },
      approved: { type: Boolean, required: true },
    },
    options
  );

  return mongoose.model('credit', serviceSchema);
};
