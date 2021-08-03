const express = require('express');

const router = express.Router();

// import relative dependencies
const categoryController = require('../controllers/category');

// /admin/category => POST --- for adding a category
router.post('/categories', categoryController.addCategory);

// /admin/category => GET --- for retrieving all categories
router.get('/categories', categoryController.getCategories);

// /admin/category/:categoryId => PUT --- for updating a single category
router.put('/categories/:categoryId', categoryController.updateCategory);

// /admin/category/:categoryId => DELETE --- for deleting a single category
router.delete('/categories/:categoryId', categoryController.deleteCategory);

module.exports = router;