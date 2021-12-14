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

router.get('/questions/:id/answers', asyncHandler( async (req, res) => {
    const answer = Answers.findAll()
    res.render('answers', { answer })
}))

router.post('/questions/:id', answerValidators, csrfProtection, asyncHandler( async (req, res) => {
    const { body } = req.body

    const answer = db.Answer.build({
        body,
    })

    const validatorErrors = validationResult(req);

    if(validatorErrors.isEmpty()) {
        await answer.save();
        res.redirect('/questions/:id')
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
      res.render('book-add', {
        title: 'Add an Answer',
        errors,
        csrfToken: req.csrfToken(),
      });
    }
}))

module.exports = router
