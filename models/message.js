'use strict';
module.exports = function(sequelize, DataTypes) {
  var message = sequelize.define('message', {
    body: DataTypes.TEXT,
    translation: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    palId: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    palName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.message.belongsToMany(models.user, {through: 'usersMessages'});

        // associations can be defined here
      }
    }
  });
  return message;
};

  // language: DataTypes.TEXT,
