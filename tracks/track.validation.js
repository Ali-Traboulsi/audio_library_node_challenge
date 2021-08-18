const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi)

const TrackValidator = {
    body: Joi.object({
        name: Joi.string().min(3).trim(true).required(),
        singer: Joi.string().min(3).trim(true).required(),
        categoryId: Joi.objectId,
        albumId: Joi.objectId,
        imageUrl: Joi.string().uri().required(),
    }),
};

module.exports = TrackValidator;