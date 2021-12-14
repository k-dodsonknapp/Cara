const express = require('express');
const req = require('express/lib/request');
const { loginUser } = require('../auth')
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


router.get('/comments/:id(\\d+)', asyncHandler(async (req, res) => {
    const commentsId = parseInt(req.params.id, 10);

    const comment = await db.Comment.findByPk(commentsId);
    res.render('', {})
}));

const commentValidator = [
    check("body")
        .exists({ checkFalsy: true })
        .withMessage("Must have a something in the body.")
];

router.get('/comments/add', checkPermissions, csrfProtection, (req, res) => {
    const comments = db.Comments.build();
    res.render('', {
        title: 'Add Park',
        comments,
        csrfToken: req.csrfToken(),
    });
});

router.post('/comments/add)', csrfProtection, commentValidator, checkPermissions, asyncHandler(async (req, res) => {
    checkPermissions(answerToUpdate, res.locals.user);

    const { body } = req.body;

    const comment = db.Comments.build({ body });

    const validatorErrors = validationResult(req)

    if (validatorErrors.isEmpty()) {
        await comment.save();
        res.redirect("/home");
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render("", {
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

        checkPermissions(answerToUpdate, res.locals.user);

        res.render('park-edit', {
            title: '',
            comment,
            csrfToken: req.csrfToken(),
        });
    }));


router.post('/comments/:id(\\d+)/edit)', csrfProtection, commentValidator, asyncHandler(async (req, res) => {
    const { body } = req.body;

    checkPermissions(answerToUpdate, res.locals.user);

    const comment = db.Comments.build({ body });

    const validatorErrors = validationResult(req)

    if (validatorErrors.isEmpty()) {
        await comment.update(comment);
        res.redirect("/home");
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render("", {
            title: "comment",
            comment,
            errors,
            csrfToken: req.csrfToken(),
        })
    }
}));

router.get('/comment/:id(\\d+)/delete', csrfProtection,
    asyncHandler(async (req, res) => {
        const commentId = parseInt(req.params.id, 10);
        const comment = await db.Attraction.findByPk(commentId);

        checkPermissions(answerToUpdate, res.locals.user);
        res.render('', {
            title: 'Delete Comment',
            comment,
            csrfToken: req.csrfToken(),
        });
    }));

module.exports = router;
