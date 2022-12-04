const nhanvienRouter = require('./nhanvien.router');
const authRouter = require('./auth.router');
const adminRouter = require('./admin.router');

function route(app) {
    app.use('/', nhanvienRouter);
    app.use('/auth', authRouter);
    app.use('/admin', adminRouter);
}

module.exports = route;