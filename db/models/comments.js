'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    answersId: DataTypes.INTEGER
  }, {});
  Comments.associate = function(models) {
    // associations can be defined here
  };
  return Comments;
};