const express = require('express');

const router = express.Router();

// import relative dependencies
const trackController = require('../controllers/track');

// define paths


// /admin/add-track => POST --- for adding a track and updating the related album track number
router.post('/tracks', trackController.addTrack);

// /admin/albums/:albumId => GET --- for fetching a single album
router.get('/tracks/:trackId', trackController.getTrack);

// /tracks/ => GET --- for fetching all tracks
router.get('/tracks', trackController.getTracks);

// /admin/update-track/:trackId => PUT --- for updating a single track
router.put('/tracks/:trackId', trackController.updateTrack);

// /admin/delete-track/:trackId => DELETE --- for deleting a single track
router.delete('/tracks/:trackId', trackController.deleteTrack);


module.exports = router;