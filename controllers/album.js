const Category = require("../models/category");
const Album = require("../models/album");
const Track = require("../models/track");

const mongoose = require("mongoose");

const { handleError } = require("./error");
const { deleteFile } = require("../helpers/file");
const Error = require("../utils/error");

exports.addAlbum = async (req, res, next) => {
  try {
    if (!req.file) {
      throw Error(422, "No Image Provided!")
    }

    const album = new Album({
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.file.path,
    });

    const result = await album.save();
    if (!result) {
      throw Error(500, "Failed to create album");
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
      throw Error(404, "album not found")
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
    throw Error(404, "album not found")
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
      throw Error(422, "No File Picked")
    }

    const album = await Album.findById(albumId);
    if (!album) {
      throw Error(404, "album not found")
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
      throw Error(500, "cannot delete album that has tracks")
    }

    const album = await Album.findById(albumId);
    if (album.length === 0) {
      throw Error(404, "album not found")
    }
    deleteFile(album.imageUrl);
    await Album.findByIdAndRemove(albumId);
    return res.send("album deleted").status(201);
  } catch (err) {
    handleError(err, next);
  }
};
