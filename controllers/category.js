const Category = require("../models/category");
const Album = require("../models/album");
const Track = require("../models/track");

const { handle500Error } = require("./error");

exports.addCategory = async (req, res, next) => {
  try {
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    const result = await category.save();
    if (!result) {
      return next(new Error("Failed to create category"));
    }
    return res.send(result).status(201);
  } catch (err) {
    handle500Error(err, next);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const result = await Category.find().sort("-created_at");
    if (!result) {
      return next(new Error("Category Not Found"));
    }
    return res.send(result).status(201);
  } catch (err) {
    handle500Error(err, next);
  }
};

exports.updateCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await Category.findById(categoryId);

    if (category.length === 0) {
      return next(new Error("Category Not Found"));
    }

    category.name = req.body.name;
    category.description = req.body.description;

    const result = await category.save();

    return res.send(result).status(201);
  } catch (err) {
    handle500Error(err, next);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  try {
    const result = await Category.findByIdAndRemove(categoryId);

    if (!result) {
     return next(new Error("Category Not Found"));
    }

    return res.send("Deleted").status(201);
  } catch (err) {
    handle500Error(err, next);
  }
};
