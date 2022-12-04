const express = require('express');
const router = express.Router();
const nhanvienController = require('../app/controllers/nhanvien.controller');

router.get('/:manv', nhanvienController.index); 

module.exports = router;