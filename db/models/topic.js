'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Topic.associate = function(models) {
    // associations can be defined here
    Topic.hasMany(models.Question, {
      foreignKey: 'topicsId'
    })
    Topic.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  };
  return Topic;
};
