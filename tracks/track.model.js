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
    imageUrl: {
        type: String,
        // required: true
    },
    __v: {type: Number, select: false},
},{timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Track', TrackSchema);
