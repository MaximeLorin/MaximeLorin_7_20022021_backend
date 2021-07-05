const Posts = require("../models/Posts");
const fs = require("fs");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch {
    res.status(400).json(error);
  }
};
