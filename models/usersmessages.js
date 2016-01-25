'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersMessages = sequelize.define('usersMessages', {
    userId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersMessages;
};
