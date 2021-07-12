import Sequelize from "sequelize";
import sequelize from "./connection";

export = sequelize.define("User", {
  userId: {
    type: Sequelize.INTEGER,
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
