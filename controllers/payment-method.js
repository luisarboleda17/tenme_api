
const { paymentMethod: PaymentMethod } = require('../models');
const { addPaymentMethod: addPaymentMethodUser } = require('../services/user');
const { PAYMENT_METHODS_TYPES } = require('../commons');

/**
 * Get payment methos of user
 * @param userId
 * @returns {Promise<any>}
 */
const getPaymentMethods = (userId) => new Promise(
  async (resolve, reject) => {
    try {
      PaymentMethod.find(
        { user: userId },
        (err, methods) => {
          if (err) return reject(err);
          resolve(methods || []);
        }
      ).populate('bank', 'name');
    } catch(err) {
      console.error(err);
      reject(err);
    }
  }
);

/**
 * Add payment method
 * @param data
 * @param userId
 * @returns {Promise<any>}
 */
const addPaymentMethod = (data, userId) => new Promise(
  async (resolve, reject) => {
    try {
      data.user = userId;
      
      if (data.type === PAYMENT_METHODS_TYPES.CARD) {
        data.cardLast4 = parseInt(data.cardNumber.toString().substr(-4), 10);
      }

      const method = new PaymentMethod(data);
      await method.save();

      await addPaymentMethodUser(userId, method.id);

      resolve();
    } catch(err) {
      console.error(err);
      reject(err);
    }
  }
);

module.exports = {
  getPaymentMethods,
  addPaymentMethod
};
