const AuthService = require("./auth.service");
const { handleError } = require("../controllers/error.controller");

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
    const result = await AuthService.signUp(req.body);
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
};

exports.sendResetPass = async (req, res, next) => {
  try {
    const result = await AuthService.sendResetPassLink(req.body);
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
};

exports.validateResetToken = async (req, res, next) => {
  try {
    const resetToken = req.params.resetToken;
    const result = await AuthService.validateResetToken(resetToken);
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const resetToken = req.params.resetToken;
    const result = await AuthService.resetPassword(resetToken, req.body);
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next)
  }
}
