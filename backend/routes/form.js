const express = require('express');

const router = express.Router();
const {
  contactForm,
  contactAdvertAuthorForm,
} = require('../controllers/formCtrlr');

// validators
const { runValidation } = require('../validators');
const { contactFormValidator } = require('../validators/form');

router.post('/contact', contactFormValidator, runValidation, contactForm);
// eslint-disable-next-line prettier/prettier
router.post('/contact-advert-author', contactFormValidator, runValidation, contactAdvertAuthorForm);

module.exports = router;
