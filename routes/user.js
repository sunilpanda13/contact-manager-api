const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/signIn",userController.signIn);

router.post("/register",userController.register);

router.post("/checkEmail",userController.isEmailExist);

module.exports = router;