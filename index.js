/** Created by Luis Arboleda on 23 Jun. 2019 **/

const app = require('./app');

const startServer = async () => {
  try {
      await app.start();
      console.log(`Server up in ${app.info.uri}`);
  }   catch (error) {
      console.log(`Error starting server: ${error}`);
  }
};

startServer();
