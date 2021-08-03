const Category = require("../models/category");
const Album = require("../models/album");
const Track = require("../models/track");

const mongoose = require('mongoose');

const { handle500Error } = require("./error");

exports.addAlbum = async (req, res, next) => {
  try {
    const album = new Album({
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
    });

    const result = await album.save();
    if (!result) {
      return next(new Error("Failed to create album"));
    }
    return res.send(result).status(201);
  } catch (err) {
    handle500Error(err, next);
  }
};

exports.getAlbums = async (req, res, next) => {
  const result = await Album.find().sort("-created_at");
  return res.send(result).status(201);
};

exports.updateAlbum = async (req, res, next) => {
  const albumId = req.params.albumId;

  try {
    const album = await Album.findById(albumId);
    if (album.length === 0) {
      return next(new Error("Album not found"));
    }
    album.name = req.body.name;
    album.description = req.body.description;
    album.showNbTracks = req.body.showNbTracks;
    album.imageUrl = req.body.imageUrl;

    const result = await album.save();
    return res.send(result).status(201);
  } catch (err) {
    handle500Error(err, next);
  }
};

exports.deleteAlbum = async (req, res, next) => {
  const albumId = req.params.albumId;

  try {
    const track = await Track.find({ albumId: albumId });
    if (track.length > 0) {
      return res.send({message: 'cannot delete album that has tracks'}).status(500);
    }
    const result = await Album.deleteOne({_id: new mongoose.Types.ObjectId(albumId)})
    return res.send("album deleted").status(201);
  } catch (err) {
    handle500Error(err, next);
  }
};

exports.getAlbum = async (req, res, next) => {
  const albumId = req.params.albumId;

  try {
    const album = await Album.findById(albumId);
    if (album.length === 0) {
      return next(new Error("album not found"));
    }
    return res.send(album).status(201);
  } catch (err) {
    handle500Error(err, next);
  }
};
