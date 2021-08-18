const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    nbOfTracks: {
        type: Number,
        default: 0
    },
    imageUrl: {
      type: String,
    },
    showNbTracks: {
        type: Boolean,
    },
    __v: {type: Number, select: false},
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Album', AlbumSchema);
