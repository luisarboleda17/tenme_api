
const { PAYMENT_METHODS_TYPES, ACCOUNT_TYPES } = require('../commons');

module.exports = (mongoose, options) => {
  const Schema = mongoose.Schema;

  const paymentMethodsSchema = new Schema(
    {
      user: { type: Schema.ObjectId, ref: 'user', required: true, index: true },
      type: { type: String, required: true, enum: [PAYMENT_METHODS_TYPES.CARD, PAYMENT_METHODS_TYPES.ACCOUNT], index: true },
      cardholderName: { type: String },
      cardNumber: { type: Number },
      cardLast4: { type: Number },
      cardExpirationMonth: { type: Number },
      cardExpirationYear: { type: Number },
      cvv: { type: Number },

      bankId: { type: Schema.ObjectId, ref: 'bank' },
      accountType: { type: String, enum: [ACCOUNT_TYPES.CHECKING, ACCOUNT_TYPES.SAVING]},
      accountNumber: { type: Number }
    },
    options
  );

  paymentMethodsSchema.virtual('bank', { ref: 'bank', localField: 'bankId', foreignField: '_id', justOne: true });

  return mongoose.model('paymentMethod', paymentMethodsSchema);
};
