const express = require('express');

const router = express.Router();

// import relative dependencies
const adminController = require('../controllers/admin');

// define paths

// /admin/add-category => POST --- for adding a category
router.post('/add-category', adminController.addCategory);

// /admin/get-categories => GET --- for retrieving all categories
router.get('/get-categories', adminController.getCategories);

// /admin/update-category/:categoryId => PUT --- for updating a single category
router.put('/update-category/:categoryId', adminController.updateCategory);

// /admin/delete-category/:categoryId => DELETE --- for deleting a single category
router.delete('/delete-category/:categoryId', adminController.deleteCategory);

// /admin/add-album => POST --- for adding an album
router.post('/add-album', adminController.addAlbum);

// /admin/add-track => POST --- for adding a track and updating the related album track number
router.post('/add-track', adminController.addTrack);

// /admin/get-albums => GET --- for fetching all albums
router.get('/get-albums', adminController.getAlbums);

// /admin/update-album/:albumId => PUT --- for updating an album
router.put('/update-album/:albumId', adminController.updateAlbum);

// /admin/delete-album/:albumId => DELETE --- for deleting an album
router.delete('/delete-album/:albumId', adminController.deleteAlbum);

// /admin/get-album/:albumId => GET --- for fetching a single album
router.get('/get-album/:albumId', adminController.getAlbum);



module.exports = router;