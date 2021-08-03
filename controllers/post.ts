const { sequelize, Post } = require("../models");

import { Request, Response, NextFunction } from "express";
import fs from "fs";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = new Post({
      author: req.body.author,
      title: req.body.title,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req?.file?.filename
      }`,
    });
    const save = await post.save();
    console.log(save, post);
    res.status(201).json({ message: "Post créé ! " });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
