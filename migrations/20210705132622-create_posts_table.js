"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Posts", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: Sequelize.DATE(2),
      title: Sequelize.STRING(30),
      content: Sequelize.STRING(350),
      likes: Sequelize.DECIMAL(10),
      dislikes: Sequelize.DECIMAL(10),

      userId: Sequelize.INTEGER(11),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Posts");
  },
};
