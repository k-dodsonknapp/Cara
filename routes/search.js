const express = require('express')
const db = require('../db/models')

const router = express.Router();

router.get('/search', function (req, res) {
const question = db.Question.findAll({
  limit: 10
})
return res.render('search-questions',{
  title: 'Search',
  question: question,
} )
})

router.post('/search', async (req, res) => {
  const questions = await db.Question.findAll({
    limit: 15,
  });
  return res.render('search-questions', {
    title: 'Questions found:',
    questions: questions
  });
});


module.exports = router;
