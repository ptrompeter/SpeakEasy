'use strict';
var bcrypt = require('bcrypt');
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
    lastRequest: DataTypes.DATE,
    matchWaiting: DataTypes.BOOLEAN,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.user.belongsToMany(models.message, {through: 'usersMessages'});
        models.user.belongsToMany(models.user, {as: 'pals', through: 'usersPals'});
        // associations defined above
      }
    },
    instanceMethods: {
      checkPassword: function(pass, callback){
        if(pass && this.password){
          bcrypt.compare(pass,this.password,callback);
        } else{
          callback(null,false);
        }
      }
    },
    hooks: {
      beforeCreate: function(user, optrion, callback){
        if(user.password){
          bcrypt.hash(user.password, 10, function(error,hash){
            if(error) return callback(error);
            user.password=hash;
            callback(null, user);
          });
        } else {
          callback(null, user);
        }
      }
    }
  });
  return user;
};
