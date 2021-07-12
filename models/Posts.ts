import Sequelize from "sequelize";
import sequelize from "./connection";

export = sequelize.define("Posts", {
  id: {
    type: Sequelize.INTEGER,
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
