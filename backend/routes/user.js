const express = require('express');

const router = express.Router();
const { requireSignin, authMiddleware } = require('../controllers/authCtrlr');
const { read, publicProfile } = require('../controllers/userCtrlr');

// validators

router.get('/profile', requireSignin, authMiddleware, read);
router.get('/user/:username', publicProfile);

module.exports = router;
