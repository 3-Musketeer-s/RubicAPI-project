/**
 * @file swap.js
 * @description This file contains the route handlers for managing token swaps through the Rubic API. It defines multiple endpoints for performing swap operations, 
 * including `/` for creating basic swaps, `/Best` for fetching the best swap quotes, and `/Status` for checking the status of a specific transaction using its hash. 
 * The file includes validation of incoming requests using Joi, and utilizes models for payload structuring. 
 * It communicates with Rubic's API for initiating and managing swaps and provides detailed error handling and logging. 
 * Environment variables are used to configure API endpoints. 
 * The file also contains placeholders for additional functionality like executing swaps and interacting with transaction-related models, though some functionality is commented out.
 *
 * @dependencies:
 * - `express`: A web framework for building the API.
 * - `axios`: A promise-based HTTP client used to make requests to external APIs (Rubic and Info APIs).
 * - `dotenv`: Loads environment variables from the `.env` file.
 * - `swapModel`, `swapBestModel`: Models used for structuring the request payloads for swaps and best swap requests.
 * - `swapValid`, `swapBestValid`: Joi validation schemas to validate request bodies.
 * 
 * @endpoints:
 * - `POST /`: Initiates a basic token swap using Rubic API.
 * - `POST /Best`: Fetches the best possible token swap quote using Rubic's API.
 * - `GET /Status`: Fetches the status of a transaction by its hash.
 * 
 * @note:
 * - This file handles both simple and best swap quote requests.
 * - It validates incoming requests before proceeding with Rubic API calls.
 * - The `/Status` endpoint checks the transaction status by querying the Info API.
 */

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
//         });
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
