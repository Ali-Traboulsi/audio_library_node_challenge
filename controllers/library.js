const Category = require('../models/category');
const Album = require('../models/album');
const Track = require('../models/track');

exports.getAlbums = (req, res, next) => {
    Album
        .find()
        .then(albums => {
            if (albums) {
                res.send(albums).status(200);
            } else {
                res.end()
            }
        })
        .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    res.send('<h1>Hello World!</h1>');
}


