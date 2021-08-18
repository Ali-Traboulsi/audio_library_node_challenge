const express = require("express");
const { validate } = require("express-validation");

const router = express.Router();

// import relative dependencies
const authController = require("./auth.controller");
const authValidationSetting = require("./auth.validation");

// /signup => POST --- for registering a user
router.post("/signup", validate(authValidationSetting), authController.signUp);

router.post("/login", authController.signIn);

router.put("/send-reset", authController.sendResetPass);

router.get("/reset/:resetToken", authController.validateResetToken);

router.put("/reset/:resetToken", authController.resetPassword);

module.exports = router;
