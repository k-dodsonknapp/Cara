const express = require('express')
const router = express.Router()
const { csrfProtection, asyncHandler } = require('./utils')
const { check, validationResult } = require('express-validator');
const { loginUser, restoreUser, logoutUser, requireAuth } = require("../auth")
const db = require('../db/models');
const app = require('../app');


const answerValidators = [
    check('body')
     .exists({ checkFalsy: true })
     .withMessage('Please enter an answer')
     .isLength({ min: 15 })
     .withMessage('Answer must be at least 15 characters long')
]

router.get('/questions/:id', asyncHandler( async (req, res) => {
    const answer = Answers.findAll()
    res.render('answers', { answer })
}))

module.exports = router
