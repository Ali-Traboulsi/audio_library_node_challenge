const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator/check");

const User = require("../models/user");

const { handleError } = require("./error");
const { TOKEN_SECRET, SENDER_EMAIL, SENDER_PASS } = require("../config/constants");

// // create tranport
// const transport = nodemailer.createTransport(
//   sendGridTransport({
//     auth: {
//       api_key:
//         "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",
//     },
//   })
// );

// create another transport
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASS,
  },
});

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check if user found in the db
    const user = await User.findOne({ email: email });
    if (!user) {
      throw {
        statusCode: 401,
        message: "a user with that email was not found!",
      };
    }

    // compare passwords if user is found
    const isEqual = await bcrypt.compare(password, user.password);

    // check if it is no equal
    if (!isEqual) {
      throw { statusCode: 401, message: "email or password is incorrect" };
    }

    // generate a jwt token
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      TOKEN_SECRET,
      {
        expiresIn: "2h",
      }
    );

    return res.status(201).send({ token: token, userId: user._id.toString() });
  } catch (err) {
    handleError(err, next);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw { statusCode: 422, errors: errors.array() };
    }

    // get user input
    const { name, email, password } = req.body;

    // validate user input
    if (!(name && email && password)) {
      // return res.status(400).send("All Input Required!");
      throw { statusCode: 422, message: "All inputs are required!" };
    }

    // check if user already exist before creating a new user
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      // return res.status(409).send("User Already Exist. Please Login");
      throw { statusCode: 422, message: "User Already Exist. Please Login!" };
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // save user to db
    const result = await user.save();
    if (!result) {
      // return res.status(500).send("Error Saving data to DB");
      throw { statusCode: 422, message: "Error Saving data to DB" };
    }

    transport.sendMail({
      to: "ali.h.traboulsi@gmail.com",
      from: "alitraboulsi112@gmail.com",
      subject: "SignUp Succeeded",
      html: `<h1>The following email ${email} has been Successfully Signed Up</h1>`,
    });

    return res.status(201).send(result);
  } catch (err) {
    handleError(err, next);
  }
};
