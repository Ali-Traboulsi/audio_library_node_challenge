const Album = require("./album.model");
const Track = require("../tracks/track.model");

const { deleteFile } = require("../helpers/file");
const Error = require("../utils/error");
const resObject = require("../utils/response");

// adds a new album
exports.addAlbum = async (body) => {
  // if (!req.file) {
  //   throw Error(422, "No Image Provided!");
  // }

  const album = new Album({
    name: body.name,
    description: body.description,
    imageUrl: body.imageUrl,
  });

  await album.save();

  return resObject(undefined, "Successfully added one album");
};

// fetch an already created album
exports.getAlbum = async (albumId) => {
  const album = await Album.findOne({_id: albumId});
  return resObject(album, "Successfully fetched one album")
};

// fetches all albums from the database
exports.getAlbums = async (currentPage, perPage) => {

  const totalItems = await Album.countDocuments();

  const albums = await Album.find()
    .sort("-created_at")
    .skip((currentPage - 1) * perPage)
    .limit(perPage);

  // return res.send({ albums: albums, totalItems }).status(200);
  const response = resObject(albums, "Successfully fetches all albums");
  return {...response, totalItems}
};

exports.updateAlbum = async (albumId, body) => {

  // store the original image path from the req body
  // let imageUrl = body.image;

//   console.log(imageUrl);

  // // check if we have a new image being uploaded
  // if (req.file) {
  //   imageUrl = req.file.path;
  // }

  const album = await Album.findOne({_id: albumId});
  if (!album) {
    throw Error(404, "album not found");
  }

  // if (imageUrl !== undefined) {
  //   if (imageUrl !== album.imageUrl) {
  //     deleteFile(album.imageUrl);
  //   }
  // }

  await Album.updateOne(
    { _id: albumId },
    {
      $set: {
        name: body.name,
        description: body.description,
        showNbTracks: body.showNbTracks,
        imageUrl: body.imageUrl,
      },
    },
    { omitUndefined: true }
  );

  return resObject(undefined, "Successfully Updated album");
};

exports.deleteAlbum = async (albumId) => {
  const trackCount = await Track.find({ albumId: albumId }).countDocuments();
  if (trackCount > 0) {
    throw Error(500, "cannot delete album that has tracks");
  }

  // deleteFile(album.imageUrl);
  await Album.deleteOne({_id: albumId});
  return resObject(undefined, "Successfully deleted Album");
};
