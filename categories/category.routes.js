const express = require("express");

const router = express.Router();

const { body } = require("express-validator/check");

// import relative dependencies
const categoryController = require("./category.controller");

// /admin/category => POST --- for adding a category
router.post(
  "/categories",
  [
    body("name")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Title should be at least 5 characters long"),
    body("description")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Description should be at least 5 characters long"),
  ],
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
