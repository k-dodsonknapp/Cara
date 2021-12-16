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
    const questions = await Question.findAll({
      order: [['updatedAt', 'DESC']],
      limit: 10 });
    res.render("question-list", {
      questions,
      title: "Cara Homepage"
    });
  })
);

module.exports = router;
