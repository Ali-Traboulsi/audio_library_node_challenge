const Joi = require("joi");

const addCategoryValidator = {
  body: Joi.object({
    name: Joi.string().min(3).trim().required(),
    description: Joi.string().min(5).trim().required(),
  }),
};

module.exports = addCategoryValidator;