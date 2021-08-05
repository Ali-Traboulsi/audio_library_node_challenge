const { body } = require("express-validator/check");
const User = require("../models/user");

exports.validateEmail = (req, res, next) => {
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
        .normalizeEmail();
    return next();
};

exports.validateName = (req, res, next) => {
    body("name")
        .trim()
        .isString()
        .not()
        .isEmpty()
        .withMessage("Please enter your name");
    return next();
}

exports.validatePassword = (req, res, next) => {
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password should be at least 6 characters long!");
    return next();
}

//  body("name")
//       .trim()
//       .isString()
//       .not()
//       .isEmpty()
//       .withMessage("Please enter your name"),
//     body("email")
//       .trim()
//       .isEmail()
//       .withMessage("Please enter a valid email")
//       .custom(async (value, { req }) => {
//         const result = await User.findOne({ email: value });
//         console.log(result);
//         if (result) {
//           return Promise.reject("E-Mail address already exists!");
//         }
//       })
//       .normalizeEmail(),
//     body("password")
//       .trim()
//       .isLength({ min: 6 })
//       .withMessage("Password should be at least 6 characters long!"),
//