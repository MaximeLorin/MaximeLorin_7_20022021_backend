const Posts = require("../models/Posts");
const fs = require("fs");

exports.createPost = async (req, res, next) => {
  try {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Posts({
      ...postObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });
    const save = await post.save();
    res.status(201).json({ message: "Post créé ! " });
  } catch {
    res.status(400).json({ error });
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch {
    res.status(400).json(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Posts.findOne({ _id: req.params.id });
    const filename = post.imageUrl.split("/images/")[1];

    fs.unlink(`images/${filename}`, () => {
      post
        .deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet supprimmé !" }))
        .catch((error) => res.status(404).json({ error }));
    });
  } catch {
    res.status(404).json({ error });
  }
};
