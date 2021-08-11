import express from "express";
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const userCtrl = require("../controllers/user");

router.post("/signup", multer, userCtrl.signup);

router.post("/login", userCtrl.login);

router.post("/byid", userCtrl.userById);

router.get("/:uuid", multer, userCtrl.getUserPosts);

router.delete("/:uuid", multer, userCtrl.deleteUser);

export = router;
