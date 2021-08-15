const TrackService = require("./track.service");
const { handleError } = require("../controllers/error.controller");

exports.addTrack = async (req, res, next) => {
  try {
    const result = await TrackService.addTrack(req.body);
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
};

exports.getTrack = async (req, res, next) => {
  try {
    const trackId = req.params.trackId;
    const result = await TrackService.getTrack(trackId);
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
};

exports.getTracks = async (req, res, next) => {
  try {
    const trackId = req.params.trackId;
    const result = await TrackService.getTracks(trackId);
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
};

exports.getTrackByAlbum = async (req, res, next) => {
  try {
    const albumId = req.params.albumId;
    const categoryName = req.query.category;
    const currentPage = req.query.page;
    const perPage = req.body.perPage;
    const result = await TrackService.getTrackByAlbum(categoryName, albumId, perPage, currentPage);
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
};

exports.updateTrack = async (req, res, next) => {
  try {
    const trackId = req.params.trackId;
    const result = await TrackService.updateTrack(trackId, req.body);
    return res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
};

exports.deleteTrack = async (req, res, next) => {
  try {
    const trackId = req.params.trackId;
    const result = await TrackService.deleteTrack(trackId);
    return res.status(200).send(result)
  } catch (err) {
    handleError(err, next);
  }
};
