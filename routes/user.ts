import express from "express";
const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);

router.post("/login", userCtrl.login);

router.post("/byid", userCtrl.userById);

export = router;
