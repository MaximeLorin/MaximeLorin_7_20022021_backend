const { sequelize, Post, Comment, User } = require("../models");

import { Request, Response, NextFunction } from "express";
import fs from "fs";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userPic = await User.findOne({ where: { uuid: req.body.UserUuid } });

    const post = new Post({
      author: req.body.author,
      title: req.body.title,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req?.file?.filename
      }`,
      UserUuid: req.body.UserUuid,
      imageUser: userPic.userPicture,
    });
    const save = await post.save();
    console.log(save, post);
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.findAll({
      include: { model: Comment },
    });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.getOnePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //const post = await Post.findOne({ where: { id: req.params.id } });
    const post = await Post.findAll({
      include: { model: Comment },
      where: { id: req.params.id },
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = { _id: req.params.id };
    const userId = params._id.split(":")[1];
    const postId = params._id.split(":")[0];
    console.log(postId);
    const post = await Post.findOne({ where: { id: postId } });
    console.log(post);
    const filename = post.imageUrl.split("/images/")[1];
    const userPost = await User.findOne({ where: { uuid: post.UserUuid } });

    const isAdmin = await User.findOne({ where: { uuid: userId } });

    if (userId === userPost.uuid || isAdmin.isAdmin) {
      fs.unlink(`images/${filename}`, () => {
        post
          .destroy({ _id: postId })
          .then(() => res.status(200).json({ message: "Objet supprimm?? !" }))
          .catch((error: Error) => res.status(404).json({ error }));
      });
    }
  } catch (err) {
    res.status(404).json({ err });
  }
};
