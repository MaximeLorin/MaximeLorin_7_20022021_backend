const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postsCtrl = require("../controllers/posts");

router.get("/", auth, postsCtrl.getPosts);

router.post("/", auth, multer, postsCtrl.createPost);

router.delete("/:id", auth, postsCtrl.deletePost);

module.exports = router;
