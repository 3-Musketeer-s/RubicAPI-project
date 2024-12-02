var express = require("express");
var router = express.Router();
const axios = require('axios');

const swapModel = require("../models/swap.model");
const swapValid = require("../Validation/swap.valid");
const swapBestModel = require("../models/swap_best.model");
const swapBestValid = require("../Validation/swap_best.valid");
// const transactModel = require("../models/transact.model");
// const signerModel = require("../models/signer.model");
// const transactionValid = require("../Validation/transaction.valid");
require('dotenv').config();
const rubicUrl = process.env.RUBICURL;
const infoUrl = process.env.INFOURL;
/* Create swap listing. */
router.post("/", async function (req, res, next) {
  try {
    const { error, value } = swapValid.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    //Payload to send to Rubic API
    const payload = new swapModel(
      req.body.dstTokenAddress,
      req.body.dstTokenBlockchain,
      req.body.referrer,
      req.body.srcTokenAddress,
      req.body.srcTokenAmount,
      req.body.srcTokenBlockchain,
      req.body.fromAddress,
      req.body.id
    );

    //console.log(payload);

    // Make a POST request to Rubic's API
    const response = await axios.post(
        `${rubicUrl}swap`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
    );
    //console.log(response);

    // Send Rubic's API response back to the client
    res.status(200).json(response.data);
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message || error.response.data);
    res.status(error.response?.status || 500).json({
      error: error.message || "An error occurred",
      details: error.response?.data || null,
    });
  }
});

// Endpoint to handle swap request
router.post('/Best', async (req, res) => {
    try {
        const { error, value } = swapBestValid.validate(req.body);

        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
        const payload = new swapBestModel(
            req.body.srcTokenAddress,
            req.body.srcTokenBlockchain,
            req.body.dstTokenBlockchain,
            req.body.dstTokenAddress,
            req.body.srcTokenAmount,
            req.body.id,                              
            req.body.enableChecks,                           
            req.body.fromAddress,
            req.body.receiver,                        
            req.body.signature,                      
            req.body.integratorAddress,     
            req.body.slippage,                
            req.body.preferredProvider, 
            req.body.timeout,                    
            req.body.enableTestnets,    
            req.body.referrer,    
            req.body.showFailedRoutes,
            req.body.nativeBlacklist,
            req.body.foreignBlacklist
    );

        // Make a POST request to Rubic's API
        const response = await axios.post(
            `${rubicUrl}swapBest`,
            payload,
            { headers: { 'Content-Type': 'application/json' } }
        );

        // Send Rubic's API response back to the client
        res.status(200).json(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error:', error.message || error.response.data);
        res.status(error.response?.status || 500).json({
            error: error.message || 'An error occurred',
            details: error.response?.data || null,
        });
    }
});

// Endpoint to handle swap request
// router.post('/Execute', async (req, res) => {
//     try {
//         const { error, value } = transactionValid.validate(req.body);

//         if (error) {
//           return res.status(400).json({ error: error.details[0].message });
//         }
//         await executeSwap(new transactModel(req.body.transaction),new signerModel(req.body.signer));
//     } catch (error) {
//         // Handle errors
//         console.error('Error:', error.message || error.response.data);
//         res.status(error.response?.status || 500).json({
//             error: error.message || 'An error occurred',
//             details: error.response?.data || null,
//         });f
//     }
// });

/* Create swap listing. */
router.get("/Status", async function (req, res, next) {
    const { hash } = req.query;

    if (!hash) {
        return res.status(400).json({ error: 'Transaction hash is required' });
    }

    try {
        const response = await getStatus(hash);
        res.json({ response });
    } catch (error) {
    // Handle errors
    console.error("Error:", error.message || error.response?.data);
    res.status(error.response?.status || 500).json({
      error: error.message || "An error occurred",
      details: error.response?.data || null,
    });
  }
});

async function getStatus(hash) {
    try {
        const response = await axios.get(`${infoUrl}?srcTxHash=${hash}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching transaction status:', error.message);
        throw error;
    }
}

// async function executeSwap(transaction,signer) {
//     const tx = await signer.sendTransaction({
//         to: transaction.to,
//         data: transaction.data,
//         value: transaction.value,
//     });
//     await tx.wait();
//     console.log("Transaction executed:", tx.hash);
// }

module.exports = router;
