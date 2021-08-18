const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    nbOfAttempts: {
        type: Number,
    },
    status: {
        type: String,
    },
    resetToken: {
        type: String
    },
    resetTokenExpiry: {
        type: Date
    }
},{timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('User', UserSchema);