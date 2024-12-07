const Joi = require('joi');

const logSchema = Joi.object({
    dstTokenAddress: Joi.string().required(),   
    dstTokenAddressName: Joi.string(),            
    dstTokenBlockchain: Joi.string().required(),                     
    srcTokenAddress: Joi.string().required(),  
    srcTokenAddressName: Joi.string(),             
    srcTokenAmount: Joi.number().greater(0).required(),     
    srcTokenBlockchain: Joi.string().required(),
    fromAddress: Joi.string().regex(/^0x[a-fA-F0-9]{40}$/).required(),  
    quoteId: Joi.string().required(),
    transactionHash: Joi.string()                             
});

// Export schema for use in other parts of the application
module.exports = logSchema;