/** Created by Luis Arboleda on 3 Nov. 2018 **/

const Hapi = require('hapi');

const registerRoutes = require('./routes');

const app = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    app: {},
});

// Register routes
registerRoutes(app);

module.exports = app;
