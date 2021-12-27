const express = require('express')


const { Question } = require("../db/models");
const { Op } = require('sequelize');
const { asyncHandler } = require("./utils");
const router = express.Router();

async function search(word) {
  const targetQuestions = await Question.findAll({
    where: {
      title: { [Op.iLike]: `%${word}%` }
    },
    limit: 5
  });
  return Array.from(targetQuestions)
};

router.get('/search', async(req, res) => {
  const questions = Question.findAll({
    limit: 10
  });

  return res.render('search-questions', {
    title,
    questions
  });
});


router.post('/search', async (req, res) => {
  const questions = await Question.findAll({
    limit: 10,
  });
  return res.render('search-questions', {
    title: 'Questions found:',
    questions
  });
});

router.all(
  '/search/:search',
  asyncHandler(async (req, res) => {
    const searchResults = req.params.search;
    const questions = await search(`%${searchResults}%`);
    return res.render('search-questions', {
      title: 'Questions found:',
      questions
    });
  })
);

module.exports = router;
