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
    const answers = await db.Answer.findAll({
      include: {
        model: Question
      },
      order: [['updatedAt', 'DESC']],
      limit: 25 });
      console.log(answers)
    res.render("question-list", {
      answers,
      title: "Cara Homepage"
    });
  })
);

module.exports = router;
