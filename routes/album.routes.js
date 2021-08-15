const express = require("express");

const router = express.Router();

// import relative dependencies
const albumController = require("../controllers/album.controller");
const isAuth = require("../middleware/is-auth.middleware");

// /admin/add-album => POST --- for adding an album
router.post("/albums", albumController.addAlbum);

// /admin/get-albums => GET --- for fetching all albums
router.get("/albums", albumController.getAlbums);

// /admin/album/:albumId => PUT --- for updating an album
router.put("/albums/:albumId", albumController.updateAlbum);

// /admin/delete-album/:albumId => DELETE --- for deleting an album
router.delete("/albums/:albumId", albumController.deleteAlbum);

module.exports = router;
