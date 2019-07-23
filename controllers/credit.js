
const { credit: Credit, history: History } = require('../models');
const { addCreditRequest, incrementBalance } = require('../services/user');

/**
 * Request credits
 * @param data
 * @param userId
 * @returns {Promise<any>}
 */
const requestCredit = (data, userId) => new Promise(
  async (resolve, reject) => {
    try {
      const todayDate = new Date();
      data.interestRate = 10;
      data.firstPaymentDate = new Date(todayDate.setMonth(todayDate.getMonth() + 1));
      data.approved = true;
      data.user = userId;

      const credit = new Credit(data);
      const creditSave = await credit.save();

      await addCreditRequest(userId, credit.id);
      await incrementBalance(userId, data.amount);

      await History({
        user: userId,
        type: 'requested_credit',
        credit: credit.id
      }).save();

      resolve(creditSave);
    } catch(err) {
      console.error(err);
      reject(err);
    }
  }
);

module.exports = {
  requestCredit
};
