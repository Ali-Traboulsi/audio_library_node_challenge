const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    singer: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    albumId: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    __v: {type: Number, select: false},
});

module.exports = mongoose.model('Track', TrackSchema);
