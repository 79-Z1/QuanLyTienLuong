const express = require('express');
const router = express.Router();
const nhanvienController = require('../app/controllers/nhanvien.controller');

router.get('/:manv', nhanvienController.index); 
router.post('/ung-luong', nhanvienController.TaoUngLuong); 
router.post('/khieu-nai', nhanvienController.TaoKhieuNai); 

module.exports = router;