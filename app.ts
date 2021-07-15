import express, { Request, Response } from "express";
//import { sequelize } from "./models";
const { sequelize } = require("./models");

async function main() {
  await sequelize.sync();
}
main();

const path = require("path");

//const userRoutes = require("./routes/user");
//const postsRoutes = require("./routes/posts");

require("./models/connection");

const app = express();

app.use((req: Request, res: Response, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

//app.use("/api/posts", postsRoutes);
//app.use("/api/auth", userRoutes);

export default app;
