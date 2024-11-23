const Joi = require('joi');

const quoteValid = Joi.object({
    dstTokenAddress: Joi.string().required(),
    dstTokenBlockchain: Joi.string().required(),
    referrer: Joi.string().optional(),
    srcTokenAddress: Joi.string().required(),
    srcTokenAmount: Joi.number().required(),
    srcTokenBlockchain: Joi.string().required()
});

module.exports = quoteValid;