/**
 * @file Quote Router for Rubic API
 * @description This file defines routes for interacting with the Rubic API to fetch token swap quotes. 
 * It provides endpoints to fetch the best quote or all possible quotes for a given token swap.
 */var express = require("express");
var router = express.Router();
const axios = require('axios');
require('dotenv').config();
const rubicUrl = process.env.RUBICURL;

const quoteModel = require("../models/quote.model");
const quoteValid = require("../Validation/quote.valid");

/* Create quote listing. */
router.post("/Best", async function (req, res, next) {
  try {
    const { error, value } = quoteValid.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // Payload to send to Rubic API
    const payload = new quoteModel(
      req.body.dstTokenAddress,
      req.body.dstTokenBlockchain,
      req.body.referrer,
      req.body.srcTokenAddress,
      req.body.srcTokenAmount,
      req.body.srcTokenBlockchain
    );

    // Make a POST request to Rubic's API
    const response = await axios.post(
      `${rubicUrl}quoteBest`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

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

/* Create quote listing. */
router.post("/All", async function (req, res, next) {
  try {
    const { error, value } = quoteValid.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // Payload to send to Rubic API
    const payload = new quoteModel(
      req.body.dstTokenAddress,
      req.body.dstTokenBlockchain,
      req.body.referrer,
      req.body.srcTokenAddress,
      req.body.srcTokenAmount,
      req.body.srcTokenBlockchain
    );

    // Make a POST request to Rubic's API
    const response = await axios.post(
       `${rubicUrl}quoteAll`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

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
module.exports = router;
