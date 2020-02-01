const express = require('express');

const router = express.Router();
const { time } = require('../controllers/anunciosCtrlr');

router.get('/', time);

module.exports = router;
