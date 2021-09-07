import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 250000, // limit each IP to 250000 requests per windowMs
});

const { sequelize } = require("./models");

async function main() {
  await sequelize.authenticate();
}
main();

const path = require("path");

const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comment");

const app = express();

app.use(limiter);

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/posts", postsRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/comment", commentRoutes);

export default app;
