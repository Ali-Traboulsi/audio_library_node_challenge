const Joi = require("joi");

const AlbumValidator = {
    body: Joi.object({
        name: Joi.string().min(3).trim().required(),
        description: Joi.string().min(5).trim().required(),
        nbOfTracks: Joi.number().default(0),
        imageUrl: Joi.string().uri().required(),
        showNbTracks: Joi.boolean().default(false)
    }),
};

module.exports = AlbumValidator;