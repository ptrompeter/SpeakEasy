'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersPals = sequelize.define('usersPals', {
    userId: DataTypes.INTEGER,
    palId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersPals;
};
