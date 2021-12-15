const express = require('express');
const router = express.Router();

const { csrfProtection, asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth")

const db = require("../db/models");
const { Question } = db

//ensures that the owner of the resource is the only one that can edit/delete
const checkPermissions = (question, currentUser) => {
  if (question.userId !== currentUser.id) {
    const err = new Error("Illegal operation.");
    err.status = 403; // Forbidden
    throw err;
  }
};
console.log("i hate eric's console.logs")
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
    const question = await Question.findByPk(questionId, {include:[]})
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

// GET FORM TO ADD A QUESTION 
router.get("/question/add", requireAuth,
  csrfProtection,
  questionValidators,
  asyncHandler(async (req, res) => {
     res.render("question-add-form", {
       title: "Add Question",
       csrfToken: req.csrfToken(),
     });

  }));

//POST TO ADD A NEW QUESTION
router.post("/question/add",
  requireAuth,
  csrfProtection,
  questionValidators,
  asyncHandler(async (req, res) => {

    const { title, topicId } = req.body;
    console.log(res.locals.user.id)
     const topicNumId = parseInt(topicId, 10)
    const question = Question.build({
      userId: res.locals.user.id,
      topicNumId,
      title,
    });
 
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await question.save();
      res.redirect("/home");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
    res.render("question-add-form", {
         title: "Add Question",
         question,
         errors,
         csrfToken: req.csrfToken(),
       });
    }

  }));

//GET THE QUESTION BY ID TO EDIT THE QUESTION
router.get("/questions/:id(\\d+)/edit", // renders edit form
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await Question.findByPk(questionId);

    checkPermissions(question, res.locals.user);
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

    checkPermissions(questionToUpdate, res.locals.user);

    const { title } = req.body;
    const editedQuestion = title; //??? test

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await questionToUpdate.update(editedQuestion);
      res.redirect(`/question/${questionId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("question-edit", {
        title: "Edit Question",
        errors,
        question: { editedQuestion, id: questionId }, //??? test
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

    checkPermissions(question, res.locals.user);

    await question.destroy();
    res.redirect("/questions");
  })
);

module.exports = router
