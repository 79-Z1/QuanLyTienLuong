const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/admin.controller');
const nhanvienController = require('../app/controllers/nhanvien.controller');

router.get('/quanly', adminController.indexQL); 
router.get('/ketoan', adminController.indexKT); 
router.get('/lap-bang-luong', adminController.showLapBangLuong); 
router.get('/ung-luong', adminController.showUngLuong); 
router.get('/khieu-nai', adminController.showKhieuNai); 
router.get('/tinh-luong', adminController.showTinhLuong); 
router.get('/search', nhanvienController.searchNhanVien); 


module.exports = router;