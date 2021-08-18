const express = require("express");
const { validate } = require("express-validation");

const router = express.Router();

// import relative dependencies
const albumController = require("./album.controller");
const isAuth = require("../middleware/is-auth.middleware");
const AlbumValidationSetting = require("./album.validation");

// /admin/add-album => POST --- for adding an album
router.post("/albums", validate(AlbumValidationSetting) , albumController.addAlbum);

// /admin/get-albums => GET --- for fetching all albums
router.get("/albums", albumController.getAlbums);

// /admin/album/:albumId => PUT --- for updating an album
router.put("/albums/:albumId", albumController.updateAlbum);

// /admin/delete-album/:albumId => DELETE --- for deleting an album
router.delete("/albums/:albumId", albumController.deleteAlbum);

module.exports = router;
