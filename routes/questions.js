const express = require('express');
const router = express.Router();

const { csrfProtection, asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const { loginUser, restoreUser, logoutUser, requireAuth } = require("../auth")

const db = require("../db/models");
const { Question } = db

const requireAuth = (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect("/user/login");
  }
  return next();
};

//GET TEN COMMENTS - (BONUS order them by popularity)
router.get( "/questions", asyncHandler(async (req, res) => {
    const questions = await Question.findAll({ limit: 10 });
    // res.send("testing /questions route ")
    res.render("question-list", { title: "Questions", questions });
  })
);

//GET A SPECIFIC QUESTION BY ID - (when you click on a specific question)
router.get("/question/:id(\\d+)", 
 requireAuth,
 asyncHandler(async(req, res) => {
    const questionId = parseInt(req.params.id, 10)
    const question = await Question.findByPk(questionId, {include:["answers", "comments"]})
    // res.send("Testing /question/:id route")
    res.render('question-detail', { title: "Question Detail", question })
}));

const questionValidators = [
    check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for question.")
    .isLength({ max: 255 })
    .withMessage("Question must not be more than 255 characters long.")
]

//POST TO ADD A NEW QUESTION 
router.post("/question/add",
  requireAuth,
  csrfProtection,
  questionValidators,
  asyncHandler(async (req, res) => {
    const { title } = req.body;

    const question = Question.build({ title });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await question.save();
      res.redirect("/home");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("question-add", {
        title: "Add Question",
        question,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

//GET THE QUESTION BY ID TO EDIT THE QUESTION 
router.get("/questions/:id(\\d+)/edit", // renders edit form
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await Question.findByPk(questionId);
    //    res.send("Testing /questions/:id(\\d+)/edit route");
    res.render("question-edit", {
      title: "Edit Question",
      question,
      csrfToken: req.csrfToken(),
    });
  })
);


// POST THE EDIT MADE TO A QUESTION 
router.post("/questions/:id(\\d+)/edit", // post the changes on the edit form
  requireAuth,
  csrfProtection,
  questionValidators,
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const questionToUpdate = await Question.findByPk(questionId);

    const { title } = req.body;
    const editedQuestion = { title };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await questionToUpdate.update(editedQuestion);
      res.redirect(`/question/${questionId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("question-edit", {
        title: "Edit Question",
        errors,
        question: { editedQuestion, id: questionId },
        csrfToken: req.csrfToken(),
      });
    }
  })
);

// POST ROUTE TO DELETE THE QUESTION 
router.post("/questions/:id(\\d+)/delete",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await Question.findByPk(questionId);
    await question.destroy();
    res.redirect("/questions");
  })
);

module.exports = router