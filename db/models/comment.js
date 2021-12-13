'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    answersId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Answer, {
      foreignKey: 'answersId'
    })
    Comment.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  };
  return Comment;
};
