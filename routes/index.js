
const loginRoutes = require('./login');

module.exports = (app) => {
    app.route([
        ...loginRoutes,
    ]);
    return app;
};
