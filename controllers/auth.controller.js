const AuthService = require("../services/auth.service");
const { handleError } = require("./error.controller");
const { validationResult } = require("express-validator/check");

exports.signIn = async (req, res, next) => {
  try {
    const result = await AuthService.signIn(req.body);
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    // validate errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw { statusCode: 422, errors: errors.array() };
    }

    const result = await AuthService.signUp(req.body);
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
};
