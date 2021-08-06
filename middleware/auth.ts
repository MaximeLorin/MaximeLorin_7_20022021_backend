const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

module.exports = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId: any = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw "UserId non valable !";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Requête non identifiée"),
    });
  }
};
