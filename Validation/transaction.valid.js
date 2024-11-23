// const Joi = require('joi');

// const transactValid = Joi.object({
//   approvalAddress: Joi.string().required(),
//   data: Joi.string().required(),
//   to: Joi.string().required(),
//   value: Joi.string().required(),
//   depositAddress: Joi.string().required(),
//   extraFields: Joi.object().optional(),
//   feeLimit: Joi.string().required(),
//   tonMessages: Joi.array().items(
//     Joi.object({
//       address: Joi.string().required(),
//       amount: Joi.string().required(),
//       payload: Joi.string().required(),
//       stateInit: Joi.string().required()
//     })
//   ).required()
// });

// const signerValid = Joi.object({
//   account: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).required(),
//   chainId: Joi.number().required(),
//   signedMessage: Joi.string().pattern(/^0x[a-fA-F0-9]+$/).required()
// });

// const transactionValid = Joi.object({
//   transaction: transactValid.required(),
//   signer: signerValid.required()
// });

// module.exports = transactionValid;
