const express = require('express');

const router = express.Router();

// controllers
const { requireSignin, adminMiddleware } = require('../controllers/authCtrlr');
const { create, list, read, remove } = require('../controllers/tagCtrlr');

// validators
const { runValidation } = require('../validators');
const { createTagValidator } = require('../validators/tagValid');

// eslint-disable-next-line prettier/prettier
router.post('/tag', createTagValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/tags', list);
router.get('/tag/:slug', read);
router.delete('/tag/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;
