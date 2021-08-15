const dotenv = require('dotenv').config();
const crypto = require('crypto');

exports.mongodb = {
    dbName: process.env.DB_NAME || 'audioLib',
}

exports.userCredentials = {
    email: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASS,
}

exports.server = {
    port: process.env.PORT || 5000,
}

exports.jwtCredentials = {
    secretKey: process.env.TOKEN_SECRET || crypto.randomBytes(64).toString('hex'),
}