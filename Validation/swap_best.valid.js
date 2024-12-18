// payloadValidation.js
const Joi = require('joi');

const swapBestValid = Joi.object({
    srcTokenAddress: Joi.string().required(),                    
    srcTokenBlockchain: Joi.string().required(), 
    dstTokenBlockchain: Joi.string().required(), 
    dstTokenAddress: Joi.string().required(),                    
    srcTokenAmount: Joi.number().greater(0).required(),        
    id: Joi.string().required(),              
    enableChecks: Joi.boolean().default(true),       
    fromAddress: Joi.string().regex(/^0x[a-fA-F0-9]{40}$/).required(), 
    receiver: Joi.string().required(),           
    signature: Joi.string().required(),  
    integratorAddress: Joi.string().required(),   
    slippage: Joi.number().greater(0).default(0.02),   
    preferredProvider: Joi.string().default('symbiosis'), 
    timeout: Joi.number().default(32),            
    enableTestnets: Joi.boolean().default(false),     
    referrer: Joi.string().default('rubic.exchange'),   
    showFailedRoutes: Joi.boolean().default(false) ,
    nativeBlacklist: Joi.array().default([]),
    foreignBlacklist: Joi.object({
        lifi: Joi.array().default([]),
        rango: Joi.array().default([])
      }).default({ lifi: [], rango: [] })
});

module.exports = swapBestValid;
