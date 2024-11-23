const Joi = require('joi');

const swapSchema = Joi.object({
    dstTokenAddress: Joi.string().required(),               
    dstTokenBlockchain: Joi.string().valid('ETH', 'POLYGON', 'BINANCE_SMART_CHAIN').required(), 
    referrer: Joi.string().optional(),                      
    srcTokenAddress: Joi.string().required(),               
    srcTokenAmount: Joi.number().greater(0).required(),     
    srcTokenBlockchain: Joi.string().valid('ETH', 'POLYGON', 'BINANCE_SMART_CHAIN').required(),
    fromAddress: Joi.string().regex(/^0x[a-fA-F0-9]{40}$/).required(),  
    id: Joi.string().required()                             
});

// Export schema for use in other parts of the application
module.exports = swapSchema;