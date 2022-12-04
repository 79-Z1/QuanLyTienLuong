const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/auth.controller');

router.get('/login', authController.index); 
router.post('/login', authController.login);

module.exports = router;