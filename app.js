/** Created by Luis Arboleda on 3 Nov. 2018 **/

const Hapi = require('hapi');

const routes = require('./routes');
const plugins = require('./plugins');
const { APP_NAME } = require('./commons');

module.exports = () => new Promise(
  async (resolve, reject) => {
    const app = Hapi.server({
      port: process.env.PORT || 3000,
      host: 'localhost',
      app: {
        name: APP_NAME,
        env: process.env.ENV
      },
    });

    try {
      await app.register(plugins);
      app.route(routes);
      resolve(app);
    } catch(err) {
      console.error('Error loading plugins', err);
      reject(err);
    }
  }
);
