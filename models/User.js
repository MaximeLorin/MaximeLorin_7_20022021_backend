const Sequelize = require("sequelize");
const sequelize = require("./connection");

module.exports = sequelize.define("User", {
  userId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
});
