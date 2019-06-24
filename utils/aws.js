
const aws = require('aws-sdk');

aws.config.update({
  region: process.env.DB_REGION,
  endpoint: process.env.DB_ENDPOINT
});

/**
 * Create a new AWS DynamoDB Client
 * @returns {DynamoDB}
 */
const createClient = () => new aws.DynamoDB();

/**
 * Create a new AWS DynamoDB Document Client
 */
const createDocumentClient = () => new aws.DynamoDB.DocumentClient();

/**
 * Check if table exists on database
 * @param client
 * @param tableName
 * @returns {Promise<any>}
 */
const checkIfTableExist = (client, tableName) => new Promise(
  (resolve, reject) => {
    client.describeTable(
      {
        TableName: tableName
      },
      (err, _) => {
        if (err) {
          reject();
        } else {
          resolve();
        }
      }
    );
  }
);

/**
 * Create table on database
 * @param client
 * @param params
 * @returns {Promise<any>}
 */
const createTable = (client, params) => new Promise(
  (resolve, reject) => {
    client.createTable(
      params,
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  }
);

module.exports = {
  createClient,
  createDocumentClient,
  checkIfTableExist,
  createTable
};
