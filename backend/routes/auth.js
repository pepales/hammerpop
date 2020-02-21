const express = require('express');

const router = express.Router();
const {
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
} = require('../controllers/authCtrlr');

// validators

const { runValidation } = require('../validators');

const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require('../validators/authValid');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);

// eslint-disable-next-line prettier/prettier
router.post('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
// eslint-disable-next-line prettier/prettier
router.post('/reset-password', resetPasswordValidator, runValidation, resetPassword);

module.exports = router;
