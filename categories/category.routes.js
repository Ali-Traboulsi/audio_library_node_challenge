const express = require("express");

const router = express.Router();

const { body } = require("express-validator/check");
const { validate } = require("express-validation")

// import relative dependencies
const categoryController = require("./category.controller");
const categoryValidationSettings = require("./category.validation");

// /admin/category => POST --- for adding a category
router.post(
  "/categories",
  validate(categoryValidationSettings),
  categoryController.addCategory
);

// /category => GET --- for retrieving all categories
router.get("/categories", categoryController.getCategories);

// /category => GET --- for retrieving all categories
router.get("/categories/:categoryId", categoryController.getCategory);

// /admin/category/:categoryId => PUT --- for updating a single category
router.put("/categories/:categoryId", categoryController.updateCategory);

// /admin/category/:categoryId => DELETE --- for deleting a single category
router.delete("/categories/:categoryId", categoryController.deleteCategory);

module.exports = router;
