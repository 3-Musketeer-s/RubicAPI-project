const Joi = require('joi');

const swapSchema = Joi.object({
    dstTokenAddress: Joi.string().required(),               
    dstTokenBlockchain: Joi.string().required(), 
    referrer: Joi.string().optional(),                      
    srcTokenAddress: Joi.string().required(),               
    srcTokenAmount: Joi.number().greater(0).required(),     
    srcTokenBlockchain: Joi.string().required(),
    fromAddress: Joi.string().regex(/^0x[a-fA-F0-9]{40}$/).required(),  
    id: Joi.string().required()                             
});

// Export schema for use in other parts of the application
module.exports = swapSchema;