const { sequelize, User, Post, Comment } = require("../models");
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
import PasswordValidator from "password-validator";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = new PasswordValidator();
    schema.is().min(4);

    const pass = schema.validate(req.body.password);

    const hash = await bcrypt.hash(req.body.password, 10);
    if (!hash) {
      return res.status(404).json({ error: "Mot de passe vide !" });
    }

    const user = new User({
      userName: req.body.userName,
      password: hash,
      userPicture: `${req.protocol}://${req.get("host")}/images/${
        req?.file?.filename
      }`,
      isAdmin: req.body.isAdmin,
    });

    if (!user) {
      return res.status(404).json({ error: "Il n'y a rien a envoyer" });
    }
    await user.save();
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (err) {
    res.status(500).json({ error: "Impossible de s'enregistrer ! " + err });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({
      where: { userName: req.body.userName },
    });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé ! " });
    }
    // console.log(user);
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({
        error: "Mot de passe non valide !",
      });
    }
    res.status(200).json({
      userId: user.uuid,
      token: jwt.sign({ userId: user.uuid }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h",
      }),
      imageUrl: user.userPicture,
      userName: user.userName,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const userById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({
      where: { uuid: req.body.userId },
    });
    res.status(200).json(user.userName);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const posts = await User.findAll({
    //   include: { model: Post },
    //   where: { uuid: req.params.uuid },
    // });
    const posts = await Post.findAll({
      include: { model: Comment },
      where: { UserUuid: req.params.uuid },
    });
    // const result = { posts, posts };

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({
      where: { uuid: req.params.uuid },
    });

    const filename = user.userPicture.split("/images/")[1];

    fs.unlink(`images/${filename}`, () => {
      user
        .destroy({
          where: { uuid: req.params.uuid },
        })
        .then(() => res.status(200).json({ message: "User supprimé !" }))
        .catch((error: Error) => res.status(404).json({ error }));
    });
  } catch (err) {
    res.status(404).json({ err });
  }
};

exports.modifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findByPk(req.params.uuid);
    console.log(user.uuid);
    const userImg = `${req.protocol}://${req.get("host")}/images/${
      req?.file?.filename
    }`;

    if (userImg) {
      // console.log(user.uuid, userImg);
      await user.update({
        userPicture: userImg,
      });
    }

    res.status(200).json(userImg);
  } catch (error) {
    res.status(404).json(error);
  }
};
