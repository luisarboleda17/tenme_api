
const commons = require('../commons');

module.exports = (mongoose, options) => {
  const Schema = mongoose.Schema;

  const userSchema = new Schema(
    {
      accessToken: { type: String, trim: true, index: true, unique: true, sparse: true, select: false },
      password: { type: String, required: false },
      balance: { type: Number, required: true, default: 0 },
      score: { type: Number, required: true, default: 5 }, // TODO: Add valid initial user score
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
      bankInfo: {
        bankId: { type: String, required: true },
        accountType: { type: String, required: true, enum: [commons.ACCOUNT_TYPES.SAVING, commons.ACCOUNT_TYPES.CHECKING]},
        number: { type: Number, required: true }
      },
      apcAllowed: { type: Boolean, required: true },
      facebookId: { type: String, required: false, index: true },
      documentPhotoUrl: { type: String, required: true },
      registeredAt: { type: Date, default: Date.now, required: true },
      offeredServices: [{ type: Schema.ObjectId }], // TODO: Add service reference
      requestedServices: [{ type: Schema.ObjectId }], // TODO: Add service reference
      requestedCredits: [{ type: Schema.ObjectId }] // TODO: Add credit reference
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
