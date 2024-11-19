const express = require("express");
const userController = require("../controllers/userController")
const jsonwebtoken = require("../utils/jsonwebtoken")

const router = express.Router();

router.post("/signup",userController.signup);
router.post("/login",userController.login);
router.get("/logout",userController.logout);
router.get("/me",jsonwebtoken.verifyToken,userController.me)

module.exports = router