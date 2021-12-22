const express = require("express");
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");
const db = require("../db/models");

const checkPermissions = (answer, currentUser) => {
  if (answer.userId !== currentUser.id) {
    const err = new Error("Eric just create an account");
    err.status = 403; // Forbidden
    throw err;
  }
};

router.get(
  "/topic/:id(\\d+)/questions",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res) => {
    const topicsId = req.params.id;
    const topic = await db.Topic.findByPk(topicsId);
    const topics = await db.Topic.findAll();
    const questions = await db.Question.findAll({
      where: {
        topicsId,
      },
    });

    const answers = await db.Answer.findAll({
      include: {
        model: db.Question,
      },
      order: [["createdAt", "ASC"]],
    });
    console.log(answers)
    // checkPermissions(topic, res.locals.user)

    res.render("topic-questions", {
      answers,
      topics,
      topic,
      questions
    });
  })
);

module.exports = router;
