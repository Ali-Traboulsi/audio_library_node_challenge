const CategoryService = require("./category.service");
const { handleError } = require("../controllers/error.controller");
const { validationResult } = require("express-validator/check");

exports.addCategory = async (req, res, next) => {
  try {
    // store any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = { errors: errors.array(), statusCode: 422 };
      throw error;
    }
    // call the service
    const result = await CategoryService.addCategory(req.body);
    // return the response object
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryService.getCategories();
    return res.status(200).send(categories);
  } catch (err) {
    handleError(err, next);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await CategoryService.getCategory(categoryId);
    return res.status(200).send(category)
  } catch (err) {
    handleError(err, next);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const result = await CategoryService.updateCategory(categoryId, req.body);
    return res.status(200).send(result)
  } catch (err) {
    handleError(err, next);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const result = await CategoryService.deleteCategory(categoryId);
    return res.status(200).send(result)
  } catch (err) {
    handleError(err, next);
  }
};
