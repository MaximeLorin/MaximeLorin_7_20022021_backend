"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.hasMany(models.Comment);
      Post.belongsTo(models.User);
    }
  }
  Post.init(
    {
      author: DataTypes.STRING,
      title: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      imageUser: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "post",
      modelName: "Post",
    }
  );
  return Post;
};
