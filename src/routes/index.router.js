const homeRouter = require('./home.router');
const authRouter = require('./auth.router');

function route(app) {
    app.use('/', homeRouter);
    app.use('/auth', authRouter)
}

module.exports = route;