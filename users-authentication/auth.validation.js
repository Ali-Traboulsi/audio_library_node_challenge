const Joi = require("joi");

const AuthValidator = {
  body: Joi.object({
    name: Joi.string().min(3).trim(true).required(),
    email: Joi.string()
      .email()
      .normalize()
      .trim(true)
      .required(),
    password: Joi.string().min(6).trim(true).required(),
    nbOfAttempts: Joi.number().default(0),
    status: Joi.string().default("active"),
  }),
};

module.exports = AuthValidator;
