/**
 * Created by Luis Arboleda on 23 Jun, 2019.
 * Script to create AWS DynamoDB tables if they doesnt exist
 */

const { createClient, checkIfTableExist, createTable } = require('./utils/aws');

const TABLES = [
  {
    TableName: 'User',
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH"},
    ],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    },
    StreamSpecification: {
      StreamEnabled: false
    }
  },
];

/**
 * Check if database has all tables
 * @param client
 * @returns {Promise<any>}
 */
const checkDatabase = (client) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(await Promise.all(TABLES.map(table => checkIfTableExist(client, table.TableName))));
    } catch (err) {
      try {
        resolve(await Promise.all(TABLES.map(table => createTable(client, table))));
      } catch(err) {
        reject(err);
      }
    }
  }
);

/**
 * Generate all dependencies for project
 * @returns {Promise<any>}
 */
module.exports = () => new Promise(
  async (resolve, reject) => {
    const client = createClient();
    try {
      await checkDatabase(client);
      resolve(client);
    } catch (err) {
      reject(err);
    }
  }
);
