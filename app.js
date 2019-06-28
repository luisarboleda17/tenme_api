/** Created by Luis Arboleda on 3 Nov. 2018 **/

const Hapi = require('hapi');

const routes = require('./routes');
const plugins = require('./plugins');

const app = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  app: {
    name: 'Tenme',
    env: process.env.ENV
  },
});

app.register(plugins)
  .then(
    () => {
      app.route(routes);
    }
  )
  .catch(
    err => {
      console.error('Error loading plugins', err);
    }
  );

module.exports = app;
