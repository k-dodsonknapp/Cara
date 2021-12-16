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
router.get('/answers/:id(\\d+)/comments', asyncHandler(async (req, res) => {
    const commentsId = parseInt(req.params.id, 10);

    const comments = await db.Comment.findByPk(commentsId);
    res.render('answer-details', { comments })
}));

const commentValidator = [
    check("body")
        .exists({ checkFalsy: true })
        .withMessage("Must have a something in the body.")
];

//get comment form
router.get('/answer/:id(\\d+)/add', csrfProtection, asyncHandler( async (req, res) => {
    const answersId = parseInt(req.params.id, 10)
    const answer = await db.Answer.findByPk(answersId)
    res.render('comment-form', { title: 'Add Comment', answer, csrfToken: req.csrfToken()  })
}))

router.post('/comments/add', csrfProtection, commentValidator, checkPermissions, asyncHandler(async (req, res) => {
    const { body } = req.body;

    const comment = db.Comments.build({ body });

    checkPermissions(comment, res.locals.user);

    const validatorErrors = validationResult(req)

    if (validatorErrors.isEmpty()) {
        await comment.save();
        res.redirect("/home");
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render("comment-details", {
            title: "comment",
            comment,
            errors,
            csrfToken: req.csrfToken(),
        })
    }
}));


router.get('/comments/:id(\\d+)/edit', csrfProtection, checkPermissions,
    asyncHandler(async (req, res) => {
        const commentId = parseInt(req.params.id, 10);
        const comment = await db.Park.findByPk(commentId);

        checkPermissions(comment, res.locals.user);

        res.render('park-edit', {
            title: 'comment-details',
            comment,
            csrfToken: req.csrfToken(),
        });
    }));


router.post('/comments/:id(\\d+)/edit', csrfProtection, commentValidator, checkPermissions, asyncHandler(async (req, res) => {
    const { body } = req.body;

    const comment = db.Comments.build({ body });

    checkPermissions(comment, res.locals.user);

    const validatorErrors = validationResult(req)

    if (validatorErrors.isEmpty()) {
        await comment.update(comment);
        res.redirect("/home");
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render("comment-details", {
            title: "comment",
            comment,
            errors,
            csrfToken: req.csrfToken(),
        })
    }
}));

router.get('/comment/:id(\\d+)/delete', csrfProtection, checkPermissions,
    asyncHandler(async (req, res) => {
        const commentId = parseInt(req.params.id, 10);
        const comment = await db.Attraction.findByPk(commentId);

        checkPermissions(comment, res.locals.user);

        res.render('comment-details', {
            title: 'Delete Comment',
            comment,
            csrfToken: req.csrfToken(),
        });
    }));

module.exports = router;
