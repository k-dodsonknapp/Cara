var express = require('express');
var router = express.Router();
const { User } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser } = require('../auth')

/* GET users listing. */
router.get('/register', csrfProtection, asyncHandler(async function(req, res, next) {
  const user = await User.build();
  res.render('/user-register', {
    title: 'register',
    user,
    csrfToken: req.csrfToken()
  });
}));


const userValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a username.')
    .isLength({ max: 50 })
    .withMessage('Username must be fewer than 50 characters')
    .custom((value) => {
      return User.findOne({ where: { username: value } }).then(
        (user) => {
          if (user) {
            return Promise.reject(
              "Username is already in use by another account"
            )
          }
        }
      )
    }),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid email')
    .isLength({ max: 255 })
    .withMessage('Email must not be more than 255 characters long')
    .isEmail()
    .withMessage('Enter a valid email')
    .custom((value) => {
      return User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password')
    .isLength({ max: 50, min: 6 })
    .withMessage('Password must not be more than 50 or less than 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password to confirm your password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match.');
      }
      return true;
    }),
];

router.post('/register', csrfProtection, userValidators, asyncHandler(async function (req, res) {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.build({
    username,
    email
  });
  const validatorCheck = validationResult(req);
  const errors = validatorCheck.array().map(error => error.msg);
  if (!errors[0]) {
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res, user)

  } else {
    res.render('user-register', {
      user,
      title: 'Register',
      errors,
      csrfToken: req.csrfToken()
    });
  }
}));

router.get('/login', csrfProtection, asyncHandler(async function (req, res, next) {
  const user = await User.build();
  res.render('user-login', {
    user,
    title: 'Login',
    csrfToken: req.csrfToken()
  });
}));

const userLoginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Must include an email.')
    .custom(value => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (!user) {
          return Promise.reject(
            "'Login credentials invalid.'"
          );
        }
      }
      )
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.')
];

module.exports = router;
