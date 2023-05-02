"use strict";

const { DataTypes: Sequelize } = require("sequelize");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Articles", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      editorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deleted: {
        type:Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updateAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Articles");
  },
};
