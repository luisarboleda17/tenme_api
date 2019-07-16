
const { bank: Bank } = require('../models');

/**
 * Get all banks
 * @returns {Promise<any>}
 */
const getBanks = () => new Promise(
  (resolve, reject) => {
    Bank.find(
      {},
      (err, banks) => {
        if (err) { return reject(err); }
        resolve(banks);
      }
    );
  }
);

module.exports = {
  getBanks
};
