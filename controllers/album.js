const Category = require("../models/category");
const Album = require("../models/album");
const Track = require("../models/track");

const mongoose = require("mongoose");

const { handleError } = require("./error");
const { deleteFile } = require("../helpers/file");

exports.addAlbum = async (req, res, next) => {
  try {
    if (!req.file) {
      throw { statusCode: 422, message: "No image provided" };
    }

    const album = new Album({
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.file.path,
    });

    const result = await album.save();
    if (!result) {
      throw { statusCode: 500, message: "Failed to create album" };
    }
    return res.send(result).status(201);
  } catch (err) {
    handleError(err, next);
  }
};

exports.getAlbum = async (req, res, next) => {
  const albumId = req.params.albumId;

  try {
    const album = await Album.findById(albumId);
    if (album.length === 0) {
      // return next(new Error("album not found"));
      throw { statusCode: 404, message: "album not found" };
    }
    return res.send(album).status(201);
  } catch (err) {
    handleError(err, next);
  }
};

exports.getAlbums = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.body.perPage || 2;

  const totalItems = await Album.countDocuments();

  const albums = await Album.find()
    .sort("-created_at")
    .skip((currentPage - 1) * perPage)
    .limit(perPage);

  if (albums.length === 0) {
    throw { statusCode: 404, message: "Albums not found" };
  }
  return res.send({albums: albums, totalItems}).status(201);
};

exports.updateAlbum = async (req, res, next) => {
  const albumId = req.params.albumId;

  try {
    // store the original image path from the req body
    let imageUrl = req.body.image;
    // check if we have a new image being uploaded
    if (req.file) {
      imageUrl = req.file.path;
    }
    if (!imageUrl) {
      throw { statusCode: 422, message: "No File Picked" };
    }

    const album = await Album.findById(albumId);
    if (album.length === 0) {
      throw { statusCode: 500, message: "Album not found" };
    }

    if (imageUrl !== album.imageUrl) {
      deleteFile(album.imageUrl);
    }

    album.name = req.body.name;
    album.description = req.body.description;
    album.showNbTracks = req.body.showNbTracks;
    album.imageUrl = imageUrl;

    const result = await album.save();
    return res.send(result).status(201);
  } catch (err) {
    handleError(err, next);
  }
};

exports.deleteAlbum = async (req, res, next) => {
  const albumId = req.params.albumId;

  try {
    const track = await Track.find({ albumId: albumId });
    if (track.length > 0) {
      // return res
      //   .send({ message: "cannot delete album that has tracks" })
      //   .status(500);
      throw { statusCode: 500, message: "cannot delete album that has tracks" };
    }

    const album = await Album.findById(albumId);
    if (album.length === 0) {
      throw { statusCode: 404, message: "Album not found" };
    }
    // if album found, delete the image from the file system
    deleteFile(album.imageUrl);
    await Album.findByIdAndRemove(albumId);
    return res.send("album deleted").status(201);
  } catch (err) {
    handleError(err, next);
  }
};
