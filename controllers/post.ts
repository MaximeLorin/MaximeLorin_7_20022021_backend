const { sequelize, Post } = require("../models");

import { Request, Response, NextFunction } from "express";
import fs from "fs";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postObject = JSON.parse(req.body.post);
    console.log(req.body);
    delete postObject._id;
    const post = new Post({
      ...postObject,
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
