/** Created by Luis Arboleda on 23 Jun. 2019 **/

require('dotenv').config({path: `./.env.${process.env.ENV || 'dev'}`});

const Mongoose = require('mongoose');
const createApp = require('./app');

const startServer = async () => {
  try {
    await Mongoose.connect(
      process.env.DB_URI,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );

    const app = await createApp();
    await app.start();
    console.info(`${app.settings.app.name} app is up.`);
    console.info(`Environment: ${app.settings.app.env}`);
    console.info(`URL: ${app.info.uri}`);
  } catch (error) {
    console.log(`Error starting server: ${error}`);
    process.exit(1);
  }
};

startServer();
