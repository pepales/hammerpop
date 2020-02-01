const express = require('express');

const router = express.Router();
const { time } = require('../controllers/anunciosC');

router.get('/', time);

module.exports = router;
