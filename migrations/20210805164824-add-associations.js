"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Comments", "postId", {
      type: Sequelize.INTEGER,
      references: {
        model: "post",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("Post", "userId", {
      type: Sequelize.UUID,
      references: {
        model: "user",
        key: "uuid",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Comments", "postId");
    await queryInterface.removeColumn("Post", "userId");
  },
};
