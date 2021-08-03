// const Category = require("../models/category");
// const Album = require("../models/album");
// const Track = require("../models/track");
//
// // exports.addTrack = async (req, res, next) => {
// //   const name = req.body.name;
// //   const singer = req.body.singer;
// //   const albumId = req.body.albumId;
// //   const categoryId = req.body.categoryId;
// //
// //   let albumCatCount = {};
// //
// //   await Album.countDocuments({ _id: albumId })
// //     .then((countAlb) => {
// //       albumCatCount.albumCount = countAlb;
// //       console.log(albumCatCount.albumCount);
// //     })
// //     .catch((err) => console.log(err));
// //
// //   await Category.countDocuments({ _id: categoryId })
// //     .then((countCat) => {
// //       albumCatCount.categoryCount = countCat;
// //       console.log(albumCatCount.categoryCount);
// //     })
// //     .catch((err) => console.log(err));
// //
// //   console.log(albumCatCount.categoryCount, albumCatCount.albumCount);
// //
// //   if (albumCatCount.categoryCount > 0 && albumCatCount.albumCount > 0) {
// //     const track = new Track({
// //       name: name,
// //       singer: singer,
// //       albumId: albumId,
// //       categoryId: categoryId,
// //     });
// //
// //     return track
// //       .save()
// //       .then((result) => {
// //         if (result) {
// //           Album.findById(albumId)
// //             .then((album) => {
// //               album.nbOfTracks += 1;
// //               return album.save();
// //             })
// //             .then((result) => {
// //               console.log(`Album Tracks Updated: ${result}`);
// //               return result;
// //             })
// //             .catch((err) => console.log(err));
// //         }
// //         return result;
// //       })
// //       .then((result) => {
// //         console.log(result);
// //         return res.status(201).json({
// //           message: "Successfully added Song and updated Nb of Tracks",
// //           data: result,
// //         });
// //       })
// //       .catch((err) => console.log(err));
// //   } else {
// //     return res.status(400).json({
// //       message: "Category or Album does not exist",
// //     });
// //   }
// // };
//
// // exports.deleteTrack = (req, res, next) => {
// //   const trackId = req.params.trackId;
// //   Track.findByIdAndRemove(trackId)
// //     .then((track) => {
// //       Album.findById(track.albumId)
// //         .then((album) => {
// //           if (album.nbOfTracks !== 0) {
// //             album.nbOfTracks -= 1;
// //             return album.save();
// //           } else {
// //             console.log("No Tracks found in this album");
// //             return;
// //           }
// //         })
// //         .catch((err) => console.log(err));
// //       return track;
// //     })
// //     // .then(() => {
// //     //     return Track.findByIdAndRemove(trackId)
// //     // })
// //     .then(() => {
// //       return res.status(201).json({
// //         message: "Successfully deleted Track!",
// //       });
// //     })
// //     .catch((err) => console.log(err));
// // };
