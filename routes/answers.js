const express = require('express')
const router = express.Router()
const { csrfProtection, asyncHandler } = require('./utils')
const { check, validationResult } = require('express-validator');
const { loginUser, restoreUser, logoutUser, requireAuth } = require("../auth")
const db = require('../db/models');
const app = require('../app');


const checkPermissions = (answer, currentUser) => {
    if (answer.userId !== currentUser.id) {
      const err = new Error('Eric just create an account');
      err.status = 403; // Forbidden
      throw err;
    }
  };

const answerValidators = [
    check('body')
     .exists({ checkFalsy: true })
     .withMessage('Please enter a valid answer')
     .isLength({ min: 15 })
     .withMessage('Answer must be at least 15 characters long')
]

//gets all answers from a specific question
router.get('/questions/:id(\\d+)/answers', asyncHandler( async (req, res) => {
    const answer = db.Answers.findAll({
        include: ['comments', 'questions']
    })
    res.render('answer-detail', { answer })
}))

//add an answer to a specific question
router.post('/questions/:id/add', answerValidators, csrfProtection, asyncHandler( async (req, res) => {
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
      res.render('answer-form', {
        title: 'Add an Answer',
        errors,
        csrfToken: req.csrfToken(),
      });
    }
}))

//GET an edit answer form by answer id
router.get('/answer/:id(\\d+)/edit', requireAuth, csrfProtection,
asyncHandler( async (req, res) => {
    const answerId = parseInt(req.params.id, 10);
    const answer = await db.Answer.findByPk(answerId);

    checkPermissions(answer, res.locals.user);

    res.render('answer-edit', {
        title: 'Edit Answer',
        answer,
        csrfToken: req.csrfToken(),
    })
}))

router.post('/answer/:id(\\d+)/edit', requireAuth, csrfProtection,
answerValidators, asyncHandler( async (req, res) => {
    const answerId = parseInt(req.params.id, 10);
    const answerToUpdate = await db.Answer.findByPk(answerId);

    checkPermissions(answerToUpdate, res.locals.user);

    const { body } = req.body;
    const editedAnswer = { body };

    const validatorErrors = validationResult(req);

    if(validatorErrors.isEmpty()) {
        await answerToUpdate.update(editedAnswer);
        res.redirect('/questions/:id(\\d+)/answers')
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('answer-edit', {
        title: 'Edit Answer',
        answer: { ...editedAnswer, answerId },
        errors,
        csrfToken: req.csrfToken(),
      });
    }
}));

router.post('/answer/:id(\\d+)/delete', requireAuth, csrfProtection,
    asyncHandler(async (req, res) => {
        const answerId = parseInt(req.params.id, 10)
        const answer = await db.Answer.findByPk(answerId)

        checkPermissions(answer, res.locals.user);

        await answer.destroy();
        res.redirect('/questions/:id(\\d+)/answers')
    })
)

module.exports = router
