const express = require('express');

const router = express.Router();
const { requireSignin, authMiddleware } = require('../controllers/authCtrlr');
const { read } = require('../controllers/userCtrlr');

// validators

router.get('/profile', requireSignin, authMiddleware, read);

module.exports = router;
