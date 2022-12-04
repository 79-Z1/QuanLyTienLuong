const { sequelize } = require('../models/index');
const { QueryTypes } = require('sequelize');

class AdminController {
    async indexKT(req, res) {
        res.render('pages/admin/ketoan', { 
            style: '/pages/admin/ketoan.css',
        });
    }

    async indexQL(req, res) {
        res.render('pages/admin/quanly', { 
            style: '/pages/admin/quanly.css',
        });
    }
}

module.exports = new AdminController;
