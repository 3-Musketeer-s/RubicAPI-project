/**
 * @file transactionLog.js
 * @description This file defines an Express router for logging transaction details in a text file. It contains a POST endpoint that receives transaction data from the client, 
 * validates it using the `logValid` validation schema, and then logs the transaction details into a text file (`transactionLog.txt`). 
 * 
 * The transaction log includes key information about the swap such as source and destination token details, wallet addresses, transaction hash, and quote ID. 
 * This log is appended to the `transactionLog.txt` file for record-keeping and troubleshooting purposes.
 * 
 * - **POST /**: Receives transaction data, validates it, and logs the details into the `transactionLog.txt` file.
 * 
 * The `logTransaction` function is responsible for formatting the transaction data and appending it to the log file with a timestamp. 
 * If an error occurs during this process, it is logged to the console and an error response is sent to the client.
 * 
 * @note: Ensure that the `transactionLog.txt` file is properly secured as it contains transaction details that may include sensitive information.
 */

var express = require("express");
var router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// File paths
const logFilePath = path.join('./transactionLog.txt');
const logModel = require("../models/log.model");
const logValid = require("../Validation/log.valid");

/* Create swap listing. */
router.post("/", async function (req, res, next) {
  try {
    const { error, value } = logValid.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    //transaction Log details
    const logDetails = new logModel(
        req.body.srcTokenAddress,
        req.body.srcTokenAddressName,
        req.body.srcTokenAmount,
        req.body.srcTokenBlockchain,
        req.body.dstTokenAddress,
        req.body.dstTokenAddressName,
        req.body.dstTokenBlockchain,
        req.body.fromAddress,
        req.body.quoteId,
        req.body.transactionHash
    );

    const response = logTransaction(logDetails);

    res.status(200).json(response);
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message || error.response.data);
    res.status(error.response?.status || 500).json({
      error: error.message || "An error occurred",
      details: error.response?.data || null,
    });
  }
});

 // Method to log the transaction to a text file
 function logTransaction(log) {
    const logDetail = `
    ----------------Start Log ------------------------
    [${new Date().toISOString()}] 
    Transaction Details:
    - source Token Address: ${log.srcTokenAddress}
    - source Token Name: ${log.srcTokenAddressName}
    - source Token Amount: ${log.srcTokenAmount}
    - source Token Blockchain: ${log.srcTokenBlockchain}
    - destination Token Address: ${log.dstTokenAddress}
    - destination Token Name: ${log.dstTokenAddressName}
    - destination Token Blockchain: ${log.dstTokenBlockchain}
    - wallet Address: ${log.fromAddress}
    - quote Id: ${log.quoteId}
    - transaction Hash: ${log.transactionHash}
    ------------------End Log -------------------------`;

    fs.appendFile(logFilePath, logDetail, (err) => {
      if (err) {
        console.error('Failed to log transaction:', err);
        throw err;
      } else {
        console.log('Transaction logged successfully.');
        return logDetail;
      }
    });
    return logDetail;
  };

module.exports = router;