const express = require('express');
const { login, logout } = require('../controllers/authController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const router = express.Router();

router.post('/login', login);
router.post('/logout', auth, role('ADMIN'), logout);

module.exports = router;
