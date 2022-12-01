class AuthController {
    index(req, res) {
        res.render('pages/auth/login', { 
            style: '/pages/auth/login.css',
            layout:false,
        });
    }
}

module.exports = new AuthController;
