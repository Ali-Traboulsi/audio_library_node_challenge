const Category = require('../models/category');
const Album = require('../models/album');
const Track = require('../models/track');

exports.addCategory = (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const category = new Category({
        name: name,
        description: description
    });
    return category
        .save()
        .then(result => {
            console.log(result);
            return res.status(201).json({
                message: 'Successfully added Category',
                category: result
            })
        })
        .catch(err => console.log(err));
}

exports.getCategories = (req, res, next) => {
    Category
        .find()
        .sort('-created_at')
        .then(result => {
            console.log(result)
            return res.status(201).json({
                message: "Successfully Retrieved Categories!",
                categories: result
            })
        })
        .catch(err => console.log(err));
}

exports.updateCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    const updatedName = req.body.name;
    const updatedDescription = req.body.description;
    Category
        .findById(categoryId)
        .then(category => {
            category.name = updatedName;
            category.description = updatedDescription;
            return category.save();
        })
        .then(result => {
            console.log(result);
            return res.status(201).json({
                message: "Successfully Updated Category!",
                category: result
            })
        })
        .catch(err => console.log(err));
}

exports.deleteCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category
        .findByIdAndRemove(categoryId)
        .then(result => {
            console.log(res);
            return res.status(201).json({
                message: "Successfully Destroyed Category!"
            })
        })
        .catch(err => console.log(err));
}

exports.addAlbum = (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const album = new Album({
        name: name,
        description: description
    });
    return album
        .save()
        .then(result => {
            console.log(result);
            return res.status(201).json({
                message: "Successfully Added Album!",
                album: result
            })
        })
        .catch(err => console.log(err));
}

exports.addTrack = async (req, res, next) => {
    const name = req.body.name;
    const singer = req.body.singer;
    const albumId = req.body.albumId;
    const categoryId = req.body.categoryId;

    let albumCatCount = {}

    await Album
        .countDocuments({_id: albumId})
        .then(countAlb => {
           albumCatCount.albumCount = countAlb;
           console.log(albumCatCount.albumCount);
        })
        .catch(err => console.log(err));

    await Category
        .countDocuments({_id: categoryId})
        .then(countCat => {
            albumCatCount.categoryCount = countCat;
            console.log(albumCatCount.categoryCount)
        })
        .catch(err => console.log(err));

    console.log(albumCatCount.categoryCount, albumCatCount.albumCount);

    if ((albumCatCount.categoryCount > 0) && (albumCatCount.albumCount > 0)) {
        const track = new Track({
            name: name,
            singer: singer,
            albumId: albumId,
            categoryId: categoryId
        })

        return track
            .save()
            .then(result => {
                if(result) {
                    Album
                        .findById(albumId)
                        .then(album => {
                            album.nbOfTracks += 1;
                            return album.save()
                        })
                        .then(result => {
                            console.log(`Album Tracks Updated: ${result}`)
                            return result;
                        })
                        .catch(err => console.log(err))
                }
                return result;
            })
            .then(result => {
                console.log(result);
                return res.status(201).json({
                    message: "Successfully added Song and updated Nb of Tracks",
                    data: result
                })
            })
            .catch(err => console.log(err));
    } else {
        return res.status(400).json({
            message: "Category or Album does not exist"
        })
    }




}

exports.getAlbums = (req, res, next) => {
    Album
        .find()
        .sort('-created_at')
        .then(result => {
            console.log(result)
            return res.status(201).json({
                message: "Success Retrieving Albums",
                albums: result
            })
        })
        .catch(err => console.log(err));
}

exports.updateAlbum = (req, res, next) => {
    const albumId = req.params.albumId;
    const updatedName = req.body.name;
    const updatedDescription = req.body.description;
    const showNbTracks = req.body.showNbTracks;

    Album
        .findById(albumId)
        .then(album => {
            album.name = updatedName;
            album.description = updatedDescription;
            album.showNbTracks = showNbTracks;

            return album.save();
        })
        .then(result => {
            console.log(result);
            return res.status(201).json({
                message: "Album Updated Successfully!",
                album: result
            })
        })
        .catch(err => console.log(err));
}

exports.deleteAlbum = (req, res, next) => {
    const albumId = req.params.albumId;
    Album
        .findByIdAndRemove(albumId)
        .then(result => {
            Track
                .deleteMany({albumId: albumId})
                .then(() => console.log("Deleted All Related Tracks"))
                .catch(err => console.log(err));
            return result;
        })
        .then(() => {
            console.log('DESTROYED ALBUM!')
            return res.status(201).json({
                message: "Successfully Deleted Album!",
            })
        })
        .catch(err => console.log(err));
}

exports.getAlbum = (req, res, next) => {
    const albumId = req.params.albumId;
    Album
        .findById(albumId)
        .then(result => {
            console.log(result)
            return res.status(201).json({
                message: `Successfully Retrieved Album with name: ${result.name}`,
                album: result
            })
        })
        .catch(err => console.log(err));
}


exports.updateTrack = (req, res, next) => {
    const trackId = req.params.trackId;
    Track
        .findById(trackId)
        .then(track => {
            const updatedName = req.body.name;
            const updatedSinger = req.body.singer;
            const updatedAlbumId = req.body.albumId;
            const updatedCategoryId = req.body.categoryId;

            if (track.albumId !== updatedAlbumId) {
                Album
                    .findById(track.albumId)
                    .then(album => {
                        album.nbOfTracks -= 1;
                       return album.save()
                    })
                    .then(result => console.log(result))
                    .catch(err => console.log(err));
            }

            track.name = updatedName;
            track.singer = updatedSinger;
            track.albumId = updatedAlbumId;
            track.categoryId = updatedCategoryId;

            return track.save()
        })
        .then(result => {
            console.log(result);
            Album
                .findById(result.albumId)
                .then(album => {
                    album.nbOfTracks += 1
                    return album.save()
                })
                .then(result => {
                    console.log(result)
                })
                .catch(err => console.log(err));
            return result;
        })
        .then(result => {
            return res.status(201).json({
                message: "Successfully Updated Track",
                track: result
            });
        })
        .catch(err => console.log(err));
}

exports.deleteTrack = (req, res, next) => {
    const trackId = req.params.trackId;
    Track
        .findByIdAndRemove(trackId)
        .then(track => {
            Album
                .findById(track.albumId)
                .then(album => {
                    if (album.nbOfTracks !== 0) {
                        album.nbOfTracks -= 1;
                        return album.save();
                    } else {
                        console.log("No Tracks found in this album")
                        return
                    }
                })
                .catch(err => console.log(err));
            return track;
        })
        // .then(() => {
        //     return Track.findByIdAndRemove(trackId)
        // })
        .then(() => {
          return res.status(201).json({
              message: "Successfully deleted Track!"
          });
        })
        .catch(err => console.log(err));
}