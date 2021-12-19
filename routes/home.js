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
  console.log(questions)
  const users = await User.findAll();
  const topics = await Topic.findAll();

  const imgs = [
    "./stylesheets/car.png",
    "./stylesheets/audi.png"
  ];
// img(src=`${img}` alt="This car image")

    res.render("question-list", {
      topics,
      imgs, 
      answers,
      questions,
      users,
      title: "Cara Homepage",
    });
  })
);

module.exports = router;
