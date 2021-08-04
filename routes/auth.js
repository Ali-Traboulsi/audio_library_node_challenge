const express = require("express");
const { body } = require("express-validator/check");

const router = express.Router();

// import relative dependencies
const authController = require("../controllers/auth");
const User = require("../models/user");
// /signup => POST --- for registering a user
router.post(
  "/signup",
  [
    body("name")
      .trim()
      .isString()
      .not()
      .isEmpty()
      .withMessage("Please enter your name"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(async (value, { req }) => {
        const result = await User.findOne({ email: value });
        console.log(result);
        if (result) {
          return Promise.reject("E-Mail address already exists!");
        }
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long!"),
  ],
  authController.signUp
);


router.post('/signin', authController.signIn);

module.exports = router;
