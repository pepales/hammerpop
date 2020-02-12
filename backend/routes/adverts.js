const express = require('express');

const router = express.Router();
const { create } = require('../controllers/advertsCtrlr');
const { requireSignin, adminMiddleware } = require('../controllers/authCtrlr');

router.post('/adverts', requireSignin, adminMiddleware, create);

module.exports = router;
