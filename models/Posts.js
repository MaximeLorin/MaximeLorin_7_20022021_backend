const Sequelize = require("sequelize");
const sequelize = require("./connection");

module.exports = sequelize.define("Posts", {
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
});
