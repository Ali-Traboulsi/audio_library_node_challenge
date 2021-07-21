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

exports.addTrack = (req, res, next) => {
    const name = req.body.name;
    const singer = req.body.singer;
    const albumId = req.body.albumId;
    const categoryId = req.body.categoryId;

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