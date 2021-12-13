'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Topic.associate = function(models) {
    // associations can be defined here
    Topic.hasMany(model.Question, {
      foreignKey: 'topicsId'
    })
    Topic.belongsTo(model.User, {
      foreignKey: 'userId'
    })
  };
  return Topic;
};
