/**
 * @file Process JSON token data to generate a formatted and sorted output.
 *
 * This script reads a JSON file (`output.json`) containing blockchain token data, processes it 
 * to add necessary fields like `chainId` and `logoURI`, sorts the data alphabetically by token 
 * symbol, and writes the processed data into a new file (`finalOutput.json`).
 *
 * Usage:
 * 1. Ensure the input file (`output.json`) exists in the same directory as this script.
 * 2. Run the script using Node.js: `node <script-name>.js`.
 * 3. Check the output in `finalOutput.json`.
 */
const fs = require('fs');
const path = require('path');

// File paths
const inputFilePath = path.join('./output.json');
const outputFilePath = path.join('./finalOutput.json');

// Step 1: Read the JSON file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    try {
        // Step 2: Parse the JSON data
        const jsonArray = JSON.parse(data);

        // Step 3: Process the data (e.g., add a new field)
        const processData = jsonArray.map(obj => ({
            chainId: 10,
            name: obj.name,
            symbol: obj.symbol,
            decimals: obj.decimals,
            address: obj.id,
            logoURI: `https://raw.githubusercontent.com/trustwallet/assets/c37119334a24f9933f373c6cc028a5bdbad2ecb4/blockchains/optimism/assets/${obj.id}/logo.png`
        }));

        const processedData = processData.sort((a, b) => a.symbol.localeCompare(b.symbol));

        // Step 4: Write the new data to a file
        fs.writeFile(outputFilePath, JSON.stringify(processedData, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing the file:', writeErr);
                return;
            }

            console.log('New file created successfully:', outputFilePath);
        });
    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
    }
});
