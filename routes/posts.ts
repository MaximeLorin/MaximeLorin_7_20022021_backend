import express from "express";
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postsCtrl = require("../controllers/post");

router.get("/", postsCtrl.getPosts);

router.get("/:id", postsCtrl.getOnePost);

router.post("/", multer, postsCtrl.createPost);

//router.delete("/:id", auth, postsCtrl.deletePost);

export = router;
