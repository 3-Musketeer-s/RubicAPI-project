// var express = require("express");
// var router = express.Router();
// const axios = require('axios');

// // Dummy endpoint to simulate wallet connection
// router.post('/Connect', async (req, res) => {
//     try {
//         //const { ethereumProvider } = req; // Extract Ethereum provider info from the request
//         const accounts = await req.listAccounts();
//         if (accounts.length > 0) {
//             setIsConnected(true);
//             setAccountAddress(accounts[0].address);
//             const network = await provider.getNetwork();

//             if (network.chainId !== 1n) { // Change to Ethereum chain ID
//                 await window.ethereum.request({
//                     method: 'wallet_switchEthereumChain',
//                     params: [{ chainId: '0x89' }], // Change to Ethereum chain ID
//                 });
//             }
//         } 
//         if (!ethereumProvider) {
//             return res.status(400).json({ error: 'Ethereum provider not found' });
//         }

//         // This is a placeholder to indicate interaction should be on the client-side
//         res.status(200).json({ isConnected: true });
//     } catch (error) {
//         console.error('Error connecting wallet:', error.message || error.response.data);
//         res.status(error.response?.status || 500).json({
//             error: error.message || 'Failed to connect wallet',
//             details: error.response?.data || null,
//         });
//     }
// });

// module.exports = router;