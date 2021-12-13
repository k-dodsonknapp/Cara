'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    topicsId: DataTypes.INTEGER
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
    Question.belongsTo(models.User)
  };
  return Question;
};
