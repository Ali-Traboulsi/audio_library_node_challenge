const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/user.model");
const { jwtCredentials, userCredentials } = require("../config");
const Error = require("../utils/error");
const resObject = require("../utils/response");

// create Transport
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: userCredentials.email,
    pass: userCredentials.pass,
  },
});

exports.signIn = async (body) => {
  const { email, password } = body;
  // check if user found in the db
  const user = await User.findOne({ email: email });
  if (!user) {
    throw Error(401, "email or password is incorrect");
  }

  // compare passwords if user is found
  const isEqual = password === user.password;

  // check if it is no equal
  if (!isEqual) {
    if (user.nbOfAttempts >= 5) {
      user.status = "blocked";
      await user.save();
      throw Error(
        403,
        "You have exceeded the maximum number of attempts. Please contact admin for support"
      );
    }
    user.nbOfAttempts += 1;
    await user.save();
    throw Error(401, "email or password is incorrect");
  }

  if (user.status === "blocked") {
    throw Error(401, "You are blocked")
  }

  // generate a jwt token
  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id.toString(),
    },
    jwtCredentials.secretKey,
    {
      expiresIn: "2h",
    }
  );

  // return res.status(201).send({ token: token, userId: user._id.toString() });
  return resObject({ token: token, userId: user._id.toString() }, "Successfully logged In");
};

exports.signUp = async (body) => {
  // get user input
  const { name, email, password } = body;

  // validate user input
  if (!(name && email && password)) {
    // return res.status(400).send("All Input Required!");
    throw Error(422, "All inputs are required!");
  }

  // check if user already exist before creating a new user
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    // return res.status(409).send("User Already Exist. Please Login");
    throw Error(422, "User Already Exist. Please Login!");
  }

  // create a new user
  const user = new User({
    name: name,
    email: email,
    password: password,
  });

  // save user to db
  const result = await user.save();
  if (!result) {
    // return res.status(500).send("Error Saving data to DB");
    throw Error(422, "Error Saving data to DB");
  }

  transport.sendMail({
    to: "ali.h.traboulsi@gmail.com",
    from: "alitraboulsi112@gmail.com",
    subject: "SignUp Succeeded",
    html: `<h2>Welcome ${email}</h2>`,
  });

  return resObject(undefined, "You have successfully signed up!")
};
