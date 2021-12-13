'use strict';
module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define('Questions', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    topidId: DataTypes.INTEGER
  }, {});
  Questions.associate = function(models) {
    // associations can be defined here
  };
  return Questions;
};