/** Created by Luis Arboleda on 23 Jun. 2019 **/

require('dotenv').config({path: `./.env.${process.env.ENV || 'dev'}`});

const app = require('./app');

const startServer = async () => {
  try {
      await app.start();
      console.log(`Server up in ${app.info.uri}`);
  }   catch (error) {
      console.log(`Error starting server: ${error}`);
  }
};

require('./bootstrap')().then(
  () => {
    startServer();
  }
).catch(
  err => {
    console.log(err);
    process.exit(1);
  }
);
