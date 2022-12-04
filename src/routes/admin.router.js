const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/admin.controller');

router.get('/quanly', adminController.indexQL); 
router.get('/ketoan', adminController.indexKT); 
router.get('/lap-bangluong', adminController.showLapBangLuong); 


module.exports = router;