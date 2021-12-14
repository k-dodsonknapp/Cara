const express = require('express');
const req = require('express/lib/request');
const { loginUser } = require('../auth')
const db = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
const router = express.Router();


router.get('/:id(\\d+)', asyncHandler(async(req, res) => {
    const questionId = parseInt(req.params.id, 10);

    const question = await db.Question.findByPk(questionId, {include: ['']});
    res.render('')
}));

router.post('/answers/:id(\\d+)', asyncHandler(async(req, res) => {

}));



module.exports = router;
