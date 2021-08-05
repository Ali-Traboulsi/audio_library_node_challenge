const Category = require("../models/category");
const Album = require("../models/album");
const Track = require("../models/track");

const { handleError } = require("./error");
const Error = require("../utils/error");

exports.addTrack = async (req, res, next) => {
  let categoriesCount, albumCount;
  try {
    const AlbumResult = await Album.countDocuments({ _id: req.body.albumId });
    if (!AlbumResult) {
      throw Error(404, "No albums found!");
    }
    albumCount = AlbumResult;

    const categoriesResult = await Category.countDocuments({
      _id: req.body.categoryId,
    });
    if (!categoriesResult) {
      return next(new Error("No categories found!"));
    }
    categoriesCount = categoriesResult;

    if (categoriesCount > 0 && albumCount > 0) {
      const track = new Track({
        name: req.body.name,
        singer: req.body.singer,
        albumId: req.body.albumId,
        categoryId: req.body.categoryId,
      });

      const result = await track.save();
      if (!result) {
        // return next(new Error("Failed to create track"));
        throw { statusCode: 500, message: "Failed to create track" };
      }
      return res.send(result).status(201);
    }
  } catch (err) {
    handleError(err, next);
  }
};

exports.getTrack = async (req, res, next) => {
  const trackId = req.params.trackId;
  try {
    const track = await Track.findById(trackId);
    if (!track) {
      throw Error(404, "Track not found");
    }
    return res.send(track).status(201);
  } catch (err) {
    handleError(err, next);
  }
};

exports.getTracks = async (req, res, next) => {
  try {
    const tracks = await Track.find().sort("-created_at");
    if (tracks.length === 0) {
      throw Error(404, "Tracks not found");
    }
    return res.send(tracks).status(201);
  } catch (err) {
    handleError(err, next);
  }
};

exports.getTrackByAlbum = async (req, res, next) => {
  const categoryId = req.query.category;
  const albumId = req.params.albumId;
  try {
    const tracks = await Track.find({
      albumId: albumId,
      categoryId: categoryId,
    });
    if (tracks.length === 0) {
      throw Error(404, "No Tracks Found");
    }
    return res.status(200).send(tracks);
  } catch (err) {
    handleError(err, next);
  }
};

exports.updateTrack = async (req, res, next) => {
  const trackId = req.params.trackId;
  try {
    const track = await Track.findById(trackId);
    if (!track) {
      throw Error(404, "track not found!");
    }
    track.name = req.body.name;
    track.singer = req.body.singer;
    track.albumId = req.body.albumId;
    track.categoryId = req.body.categoryId;

    await track.save();
    return res.send(track).status(201);
  } catch (err) {
    handleError(err, next);
  }
};

exports.deleteTrack = async (req, res, next) => {
  const trackId = req.params.trackId;
  try {
    const result = await Track.deleteOne({ _id: trackId });
    if (!result) {
      throw Error(404, "track not found!");
    }
    return res.send("Deleted Track!").status(201);
  } catch (err) {
    handleError(err, next);
  }
};
