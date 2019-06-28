/** Created by Luis Arboleda on 23 Jun. 2019 **/

require('dotenv').config({path: `./.env.${process.env.ENV || 'dev'}`});

const app = require('./app');

const startServer = async () => {
  try {
    await app.start();
    console.info(`${app.settings.app.name} app is up.`);
    console.info(`Environment: ${app.settings.app.env}`);
    console.info(`URL: ${app.info.uri}`);
  } catch (error) {
    console.log(`Error starting server: ${error}`);
  }
};

require('./bootstrap')().then(
  () => {
    startServer();
  }
).catch(
  err => {
    console.log('Error loading server: ', err);
    process.exit(1);
  }
);
