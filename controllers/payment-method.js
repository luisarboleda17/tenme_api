
const { paymentMethod: PaymentMethod } = require('../models');
const { addPaymentMethod: addPaymentMethodUser } = require('../services/user');

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
      );
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

      const method = new PaymentMethod(data);
      const methodSave = await method.save();

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
