const express = require('express');
const { requireAuth } = require('../auth')
const db = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const checkPermissions = (comment, currentUser) => {
    if (comment.userId !== currentUser.id) {
        const err = new Error('Invaild operation.');
        err.status = 403; // Forbidden
        throw err;
    }
};

//gets an answer with all comments
// router.get('/answer/:id(\\d+)/comments', asyncHandler(async (req, res) => {
//     const answersId = parseInt(req.params.id, 10);
//     const comments = await db.Comment.findAll({
//         where: {
//             answersId
//         }
//     });

//     console.log(comments)
//     res.render('answer-detail', { comments })
// }));

const commentValidator = [
    check("body")
        .exists({ checkFalsy: true })
        .withMessage("Must have a something in the body.")
];

//get comment form
router.get('/answer/:id(\\d+)/add', csrfProtection, asyncHandler(async (req, res) => {
    const answersId = parseInt(req.params.id, 10)
    const answer = await db.Answer.findByPk(answersId)
    res.render('comment-form', { title: 'Add Comment', answer, csrfToken: req.csrfToken() })
}))

router.post('/answer/:id(\\d+)/add', csrfProtection, commentValidator, asyncHandler(async (req, res) => {
    const { body } = req.body;
    const answerId = parseInt(req.params.id, 10)
    const answer = await db.Answer.findByPk(answerId)
    // checkPermissions(comment, res.locals.user);
    // console.log(answer)
    const comment = db.Comment.build({
        userId: res.locals.user.id,
        answersId: answer.id,
        body,
    });

    // console.log(comment)
    const validatorErrors = validationResult(req)

    if (validatorErrors.isEmpty()) {
        await comment.save();
        res.redirect(`/question/${answer.questionId}`);
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render("comment-form", {
            title: "Add a comment",
            answer,
            errors,
            csrfToken: req.csrfToken(),
        })
    }
}));

//Get the comment by Id to edit
router.get('/comments/:id(\\d+)/edit', requireAuth, csrfProtection,
    asyncHandler(async (req, res) => {
        const commentId = parseInt(req.params.id, 10);
        // console.log(commentId)
        const comment = await db.Comment.findByPk(commentId);

        checkPermissions(comment, res.locals.user);

        res.render('comment-edit', {
            title: 'Edit comment',
            comment,
            csrfToken: req.csrfToken(),
        });

    }));


router.post('/comments/:id(\\d+)/edit', requireAuth, csrfProtection,
    commentValidator, asyncHandler(async (req, res) => {
        const commentId = parseInt(req.params.id, 10);
        const commentToUpdate = await db.Comment.findByPk(commentId);
        const answer = await db.Answer.findByPk(commentToUpdate.answersId)
        const question = await db.Question.findByPk(answer.questionId)

        checkPermissions(commentToUpdate, res.locals.user);

        const { body } = req.body;
        const editedComment = { body };

        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await commentToUpdate.update(editedComment);
            res.redirect(`/question/${question.id}`)
        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
            res.render('comment-edit', {
                title: 'Edit Comment',
                comment: { ...editedComment, commentId },
                errors,
                csrfToken: req.csrfToken(),
            });
        }
    }));

router.delete(
    "/comment/:id(\\d+)",
    asyncHandler(async (req, res, next) => {
        console.log("Delete Comment Route")
        const commentId = parseInt(req.params.id, 10);
        // console.log(commentId);
        const comment = await db.Comment.findByPk(commentId);
        // console.log(comment);
        checkPermissions(comment, res.locals.user);
        await comment.destroy();
        res.json({ message: `Deleted comment with id of ${req.params.id}.` });
    }));

module.exports = router;
