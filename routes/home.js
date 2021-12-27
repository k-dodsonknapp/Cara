const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const db = require("../db/models");
const { Question, Topic, User } = db;

//GET TEN COMMENTS - (BONUS order them by popularity)
//TESTED
router.get(
  "/home",
  asyncHandler(async (req, res) => {
    const answers = await db.Answer.findAll({
      include: {
        model: Question,
      },
      order: [["createdAt", "ASC"]],
    });

    const questions = await Question.findAll({
      order: [["createdAt", "DESC"]]
    })

    const users = await User.findAll();
    const topics = await Topic.findAll();

    res.render("question-list", {
      topics,
      answers,
      questions,
      users,
      title: "Cara Homepage",
    });
  })
);

module.exports = router;
