const express = require("express");
const router = express.Router();

const { asyncHandler } = require("./utils");
const db = require("../db/models");
const { Question } = db;


//GET TEN COMMENTS - (BONUS order them by popularity)
//TESTED 
router.get(
  "/home",
  asyncHandler(async (req, res) => {
    const questions = await Question.findAll({ limit: 10 });
    res.render("question-list", { questions, title: "Cara" });
  })
);

module.exports = router;
