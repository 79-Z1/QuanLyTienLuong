const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/admin.controller');
const nhanvienController = require('../app/controllers/nhanvien.controller');

router.get('/quanly/lap-bang-cham-cong', adminController.showLapBangChamCong); 
router.get('/quanly', adminController.showCungCapTTNV); 

router.get('/ketoan', adminController.indexKT); 
router.get('/lap-bang-luong', adminController.showLapBangLuong); 
router.get('/ung-luong', adminController.showUngLuong); 
router.get('/khieu-nai', adminController.showKhieuNai); 
router.get('/tinh-luong', adminController.showTinhLuong); 
router.get('/thuc-hien-tinh-luong', adminController.TinhLuong); 
router.get('/search', nhanvienController.searchNhanVien); 
router.get('/bao-cao-thong-ke', adminController.showBaoCao);

router.put('/ung-luong/check', adminController.updateUngLuong);
router.put('/khieu-nai/check', adminController.updateKhieuNai);

router.post('/them-nhan-vien', adminController.ThemNhanVien);

module.exports = router;