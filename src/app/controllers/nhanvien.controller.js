const query = require('../services/database-query')
class NhanVienController {
    async index(req, res) {
        const allPhongBan = await query.getAllAccount();
        
        res.render('pages/nhanvien/home', { 
            allPhongBan,
            style: 'pages/nhanvien/home.css',
            layout: false,
        });
    }
}

module.exports = new NhanVienController;