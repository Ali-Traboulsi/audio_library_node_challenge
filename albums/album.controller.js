const AlbumService = require("./album.service");
const { handleError } = require("../controllers/error.controller");

// adds an album
exports.addAlbum = async (req, res, next) => {
  try {
    const result = await AlbumService.addAlbum(req.body);
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
};

// fetches an album
exports.getAlbum = async (req, res, next) => {
  try {
    const albumId = req.params.albumId;
    const result = await AlbumService.getAlbum(albumId);
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
};

// fetches all albums
exports.getAlbums = async (req, res, next) => {
  try {
    const currentPage = req.query.page || 1;
    const perPage = req.body.perPage || 2;
    const result = await AlbumService.getAlbums(currentPage, perPage);
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
};

// updates an album
exports.updateAlbum = async (req, res, next) => {
  try {
    const albumId = req.params.albumId;
    const result = await AlbumService.updateAlbum(albumId, req.body);
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
};

// delete an album
exports.deleteAlbum = async (req, res, next) => {
  try {
    const albumId = req.params.albumId;
    const result = await AlbumService.deleteAlbum(albumId);
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
};
