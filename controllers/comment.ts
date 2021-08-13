const { sequelize, Comment, Post } = require("../models");

import { Request, Response, NextFunction } from "express";
import fs from "fs";

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const comment = await Comment.create({
      author: req.body.author,
      content: req.body.content,
      PostId: req.body.postId,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req?.file?.filename
      }`,
    });

    res.status(201).json(comment);
    console.log(comment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.query.postId;

    // const comments = await Comment.findAll({ where: { postId } });
    //const postId = req.query.postId;

    const comments = await Post.findAll({
      include: { model: Comment, where: { PostId: postId } },
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    Comment.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "commentaire effacé!" });
  } catch (err) {
    res.status(404).json({ err });
  }
};
