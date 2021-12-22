const express = require('express')
const router = express.Router()
const { csrfProtection, asyncHandler } = require('./utils')
const { check, validationResult } = require('express-validator');
const { requireAuth } = require("../auth")
const db = require('../db/models');


const checkPermissions = (answer, currentUser) => {
    if (answer.userId !== currentUser.id) {
        const err = new Error('Please create an account');
        err.status = 403; // Forbidden
        throw err;
    }
};

const answerValidators = [
    check('body')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a valid answer')
        .isLength({ min: 5 })
        .withMessage('Answer must be at least 15 characters long')
]



router.get("/question/:id(\\d+)",
 requireAuth,
 asyncHandler(async(req, res) => {
    const questionId = req.params.id
    const question = await Question.findByPk(questionId, {
      include: {
        model:User
      }
    });

    const answers = await Answer.findAll({
      where: {
        questionId
      },
      limit: 5,
      order: [["createdAt","ASC"]],
      include: {
        model: User
      }
    });

    const comments = await Comment.findAll({
      include: {
        model: User
      }
    })

       res.render("question-detail", {
         title: "Question Detail",
         question,
         answers,
         comments
       });
}));

//get answer form
router.get('/question/:id(\\d+)/add', csrfProtection, asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10)
    const question = await db.Question.findByPk(questionId)
    res.render('answer-form', { title: 'Add Answer', question, csrfToken: req.csrfToken() })
}))

//add an answer to a specific question.
router.post('/question/:id(\\d+)/add', answerValidators, csrfProtection, asyncHandler(async (req, res) => {
    const { body } = req.body
    console.log(res.locals)
    const questionId = parseInt(req.params.id, 10)
    const question = await db.Question.findByPk(questionId)
    console.log(res.locals.user.id)
    const answer = db.Answer.build({
        userId: res.locals.user.id,
        questionId: question.id,
        body,
    })

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await answer.save();
        res.redirect(`/question/${questionId}`)
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('answer-form', {
            title: 'Add an Answer',
            question,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
}))

//GET an edit answer form by answer id
router.get('/answer/:id(\\d+)/edit', requireAuth, csrfProtection,
    asyncHandler(async (req, res) => {
        const answerId = parseInt(req.params.id, 10);
        const answer = await db.Answer.findByPk(answerId);

        checkPermissions(answer, res.locals.user);

        res.render('answer-edit', {
            title: 'Edit Answer',
            answer,
            csrfToken: req.csrfToken(),
        })
    }))

//Submit an edited answer
router.post('/answer/:id(\\d+)/edit', requireAuth, csrfProtection,
    answerValidators, asyncHandler(async (req, res) => {
        const answerId = parseInt(req.params.id, 10);
        const answerToUpdate = await db.Answer.findByPk(answerId);

        checkPermissions(answerToUpdate, res.locals.user);

        const { body } = req.body;
        const editedAnswer = { body };

        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await answerToUpdate.update(editedAnswer);
            res.redirect(`/question/${answerToUpdate.questionId}`)
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
