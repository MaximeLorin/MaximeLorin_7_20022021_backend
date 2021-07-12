import Posts from "../models/Posts";
import { Request, Response, NextFunction } from "express";
import fs from "fs";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Posts({
      ...postObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req?.file?.filename
      }`,
    });
    const save = await post.save();
    res.status(201).json({ message: "Post créé ! " });
  } catch {
    res.status(400).json({ Error });
  }
};

exports.getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch {
    res.status(400).json(Error);
  }
};

exports.deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Posts.findOne({ _id: req.params.id });
    const filename = post.imageUrl.split("/images/")[1];

    fs.unlink(`images/${filename}`, () => {
      post
        .deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet supprimmé !" }))
        .catch((Error: Error) => res.status(404).json({ Error }));
    });
  } catch {
    res.status(404).json({ Error });
  }
};
