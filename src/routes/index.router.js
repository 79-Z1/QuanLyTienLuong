const homeRouter = require('./home.router');

function route(app) {
    app.use('/', homeRouter);
}

module.exports = route;