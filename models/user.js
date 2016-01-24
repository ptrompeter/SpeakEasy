'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    language: DataTypes.STRING,
    nationality: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    birthday: DataTypes.DATE,
    palRecipient: DataTypes.BOOLEAN,
    lastLogin: DataTypes.DATE,
    password: DataTypes.STRING,
    lastReuest: DataTypes.DATE,
    matchWaiting: DataTypes.BOOLEAN,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.user.belongsToMany(models.message, {through: 'usersMessages'});
        models.user.hasMany(models.user, {as: 'pals'});
        // associations can be defined here
      }
    }
  });
  return user;
};
