const mongoose = require("mongoose");
const { validationResult } = require("express-validator/check");

const Category = require("../models/category");
const Album = require("../models/album");
const Track = require("../models/track");

const { handleError } = require("./error");
const Error = require("../utils/error");

exports.addCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      const error = { errors: errors.array(), statusCode: 422 };
      // error.statusCode = 422;
      throw error;
    }

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    const result = await category.save();
    if (!result) {
      throw Error(404, "Failed to create category")
    }

    return res.send(result).status(201);
  } catch (err) {
    handleError(err, next);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort("-created_at");
    if (categories.length === 0) {
      throw Error(404, "No Categories Found!");
    }
    return res.status(201).send(categories);
  } catch (err) {
    handleError(err, next);
  }
};

exports.getCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await Category.find({
      _id: new mongoose.Types.ObjectId(categoryId),
    });
    if (category.length === 0) {
      throw Error(404, "Category Not Found")
    }
    return res.status(201).send(category);
  } catch (err) {
    handleError(err, next);
  }
};

exports.updateCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await Category.findById(categoryId);

    if (category.length === 0) {
      throw Error(404, "Category Not Found");
    }

    category.name = req.body.name;
    category.description = req.body.description;

    const result = await category.save();

    return res.send(result).status(201);
  } catch (err) {
    handleError(err, next);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  try {
    const result = await Category.findByIdAndRemove(categoryId);

    if (!result) {
      throw Error(404, "Category Not Found");
    }

    return res.send("Deleted").status(201);
  } catch (err) {
    handleError(err, next);
  }
};