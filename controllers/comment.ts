const { sequelize, Comment, Post } = require("../models");

import { Request, Response, NextFunction } from "express";
import fs from "fs";

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await Comment.create({
      author: req.body.author,
      content: req.body.content,
      PostId: req.body.postId,
    });
    console.log(comment);
    // const comment = new Comment({
    //   author: req.body.author,
    //   content: req.body.content,
    // });
    // const save = await comment.save();
    // console.log(save, comment);
    res.status(201).json({ message: "Commentaire créé ! " });
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
    console.log(req.query, postId);
    const comments = await Comment.findAll({ where: { postId } });
    console.log(comments);
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json(err);
  }
};
