const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    name: {
        type: String,
    },
    singer: {
        type: String,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    albumId: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
    },
    imageUrl: {
        type: String,
    },
    __v: {type: Number, select: false},
},{timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Track', TrackSchema);
