const { sequelize, User, Post } = require("../models");
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

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
    console.log(user);
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
    const posts = await User.findAll({
      include: { model: Post },
      where: { userId: req.params.id },
    });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
