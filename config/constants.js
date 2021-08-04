const crypto = require('crypto');

exports.DB_NAME = 'audioLib';
exports.PORT = 5005;
exports.TOKEN_SECRET = crypto.randomBytes(64).toString('hex');
