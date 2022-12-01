class AuthController {
    index(req, res) {
        res.render('pages/auth/login', { 
            style: '/pages/auth/login.css'
        });
    }
}

module.exports = new AuthController;
