
const commons = require('../commons');

module.exports = (mongoose, options) => {
  const Schema = mongoose.Schema;

  const userSchema = new Schema(
    {
      accessToken: { type: String, trim: true, index: true, unique: true, sparse: true, select: false },
      password: { type: String, required: false },
      balance: { type: Number, required: true, default: Math.floor((Math.random() * 20) + 1) },
      score: { type: Number, required: true, default: Math.floor((Math.random() * 5) + 1) }, // TODO: Add valid initial user score
      status: { type: Number, required: true, default: 0 }, // TODO: Define status
      firstName: { type: String, required: true, minlength: 3, maxlength: 30, trim: true },
      middleName: { type: String, required: false, minlength: 3, maxlength: 30, trim: true },
      lastName: { type: String, required: true, minlength: 3, maxlength: 30, trim: true },
      secondSurname: { type: String, required: false, minlength: 3, maxlength: 30, trim: true },
      document: {
        id: { type: String, required: true, trim: true },
        type: { type: String, required: true, enum: [commons.DOCUMENT_TYPES.ID, commons.DOCUMENT_TYPES.PASSPORT]}
      },
      completePhone: { type: Number, required: true, index: true},
      phone: {
        countryCode: { type: Number, required: true },
        phoneNumber: { type: Number, required: true },
        valid: { type: Boolean, default: true, required: true } // TODO: Add SMS validation
      },
      email: { type: String, required: false, trim: true },
      emailValid: { type: Boolean, default: true, required: true }, // TODO: Add email validation
      apcAllowed: { type: Boolean, required: true },
      facebookId: { type: String, required: false, index: true },
      documentPhotoUrl: { type: String, required: true },
      registeredAt: { type: Date, default: Date.now, required: true },
      offeredServices: [{ type: Schema.ObjectId, ref: 'service' }],
      requestedServices: [{ type: Schema.ObjectId, ref: 'service' }],
      requestedCredits: [{ type: Schema.ObjectId, ref: 'credit' }],
      paymentMethods: [{ type: Schema.ObjectId, ref: 'paymentMethod' }]
    },
    options
  );

  userSchema.virtual('fullName').get(
    function() {
      return `${this.firstName} ${this.lastName}`;
    }
  );

  return mongoose.model('user', userSchema);
};
