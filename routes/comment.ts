import express from "express";
const router = express.Router();

const auth = require("../middleware/auth");

const commentCtrl = require("../controllers/comment");

router.post("/", commentCtrl.createComment);

router.get("/", commentCtrl.getComments);
//router.delete("/:id", auth, postsCtrl.deletePost);

export = router;
