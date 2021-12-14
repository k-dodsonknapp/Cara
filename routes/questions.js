const express = require('express');
const router = express.Router();

const { csrfProtection, asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const { loginUser, restoreUser, logoutUser, requireAuth } = require("../auth")

const db = require("../db/models");
const { Question } = db

//GET TEN COMMENTS - (BONUS order them by popularity)
router.get( "/", asyncHandler(async (req, res) => {
    const questions = await Question.findAll({ limit: 10 });
    res.send("testing question / route ")
    // res.render("question-list", { title: "Questions", questions });
  })
);

//GET A SPECIFIC QUESTION BY ID 
// router.get("/question/:id(\\d+)", asyncHandler(async())



module.exports = router