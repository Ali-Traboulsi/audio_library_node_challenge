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
        required: true,
        default: 0
    },
    showNbTracks: {
        type: Boolean,
        required: true,
        default: true
    }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Album', AlbumSchema);
