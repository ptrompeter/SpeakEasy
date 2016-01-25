'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING,
        isAlphanumeric: true,
        notEmpty: true
      },
      firstName: {
        type: Sequelize.STRING,
        isAlpha: true
      },
      lastName: {
        type: Sequelize.STRING,
        isAlpha: true
      },
      language: {
        type: Sequelize.STRING,
        isAlpha: true,
        notEmpty: true
      },
      nationality: {
        type: Sequelize.STRING,
        isAlpha: true
      },
      gender: {
        type: Sequelize.INTEGER
      },
      birthday: {
        type: Sequelize.DATE
      },
      palRecipient: {
        type: Sequelize.BOOLEAN
      },
      lastLogin: {
        type: Sequelize.DATE
      },
      password: {
        type: Sequelize.STRING,
        notEmpty: true
      },
      lastRequest: {
        type: Sequelize.DATE
      },
      matchWaiting: {
        type: Sequelize.BOOLEAN
      },
      email: {
        type: Sequelize.STRING,
        isEmail: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
