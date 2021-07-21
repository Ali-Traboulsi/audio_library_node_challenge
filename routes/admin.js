const express = require('express');

const router = express.Router();

// import relative dependencies
const adminController = require('../controllers/admin');

// define paths
router.post('/add-category', adminController.addCategory);

router.post('/add-album', adminController.addAlbum);

router.post('/add-track', adminController.addTrack);

router.get('/albums', adminController.getAlbums);

router.put('/albums/:albumId', adminController.updateAlbum);

router.delete('/delete-album/:albumId', adminController.deleteAlbum);

router.get('/albums/:albumId', adminController.getAlbum);



module.exports = router;