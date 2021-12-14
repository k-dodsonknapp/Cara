const express = require('express');
const { check, validationResult } = require("express-validator");

const db = require("../db/models");
const { Question } = db
const { csrfProtection, asyncHandler } = require("./utils");

const router = express.Router();


//GET TEN COMMENTS - (BONUS order them by popularity)

router.get( "/", asyncHandler(async (req, res) => {
    const questions = await Question.findAll({ limit: 10 });
    res.send("testing question / route ")
    // res.render("question-detail", { title: "Questions", questions });
  })
);

module.exports = router