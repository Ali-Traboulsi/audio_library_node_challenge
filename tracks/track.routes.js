const express = require("express");
const { validate } = require("express-validation");

const router = express.Router();

// import relative dependencies
const trackController = require("./track.controller");
const isAuth = require("../middleware/is-auth.middleware");
const TrackValidationSettings = require("./track.validation");

// /admin/add-track => POST --- for adding a track and updating the related album track number
router.post("/tracks", validate(TrackValidationSettings), trackController.addTrack);

// /tracks/ => GET --- for fetching all tracks
router.get("/album-tracks/:albumId", isAuth, trackController.getTrackByAlbum);

// /admin/albums/:albumId => GET --- for fetching a single album
router.get("/tracks/:trackId", trackController.getTrack);

// /tracks/ => GET --- for fetching all tracks
router.get("/tracks", trackController.getTracks);

// /tracks/:trackId => PUT --- for updating a single track
router.put("/tracks/:trackId", trackController.updateTrack);

// /tracks/:trackId => DELETE --- for deleting a single track
router.delete("/tracks/:trackId", trackController.deleteTrack);

// /tracks/ => DELETE --- for deleting all tracks
router.delete("/tracks", trackController.deleteAllTracks);

module.exports = router;
