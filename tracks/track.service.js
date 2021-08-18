const mongoose = require("mongoose");

const Track = require("./track.model");
const Error = require("../utils/error");
const resObject = require("../utils/response");

exports.addTrack = async (body) => {
  const track = new Track({
    name: body.name,
    singer: body.singer,
    albumId: body.albumId,
    categoryId: body.categoryId,
    imageUrl: body.imageUrl
  });

  const result = await track.save();
  if (!result) {
    // return next(new Error("Failed to create track"));
    throw {
      statusCode: 500,
      message: "Failed to create track! Server Error Occured!",
    };
  }
  return resObject(undefined, "Successfully Created Track!");
};

exports.getTrack = async (trackId) => {
  const track = await Track.findOne({ _id: trackId });
  return resObject(track, "Successfully fetched one track");
};

exports.getTracks = async () => {
  const tracks = await Track.find().sort("-created_at");
  return resObject(tracks, "Successfully fetched all tracks");
};

exports.updateTrack = async (trackId, body) => {
  await Track.updateOne(
    { _id: trackId },
    {
      $set: {
        name: body.name,
        singer: body.singer,
        albumId: body.albumId,
        categoryId: body.categoryId,
      },
    },
    { omitUndefined: true }
  );

  return resObject(undefined, "Successfully Updated Track!");
};

exports.deleteTrack = async (trackId) => {
  const result = await Track.deleteOne({ _id: trackId });
  if (!result) {
    throw Error(404, "track not found!");
  }
  return resObject(undefined, "Successfully Deleted Track");
};

exports.getTrackByAlbum = async (category, albumId, perPage, currentPage) => {
  // const tracks = await Track.find({
  //   albumId: albumId,
  //   categoryId: categoryId,
  // });

  const skipCount = (currentPage - 1) * perPage;

  const tracks = await Track.aggregate([
    {
      $match: { albumId: new mongoose.Types.ObjectId(albumId) },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "categoryName",
      },
    },
    {
      $project: {
        name: 1,
        singer: 1,
        albumId: 1,
        created_at: 1,
        updated_at: 1,
        categoryName: "$categoryName.name",
      },
    },
    {
      $unwind: "$categoryName",
    },
    {
      $match: { categoryName: { $regex: category || "" } },
    },
    {
      $sort: { created_at: -1 },
    },
    {
      $skip: Number(skipCount) || 0
    },
    {
      $limit: Number(perPage) || 1,
    },
  ]);

  return resObject(tracks, "Successfully fetched Track!");
};

exports.deleteAllTracks = async () => {
  await Track.deleteMany({});
  return resObject(undefined, "Successfully Deleted All Track");
}
