'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answers = sequelize.define('Answers', {
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  Answers.associate = function(models) {
    // associations can be defined here
  };
  return Answers;
};