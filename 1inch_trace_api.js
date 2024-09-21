require("dotenv").config();
const axios = require("axios");

const BASE_URL = process.env.BASE_URL;

async function getSyncedInterval(chain) {
  const url = `${BASE_URL}/${chain}/synced-interval`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  });
  return response.data;
}

async function getBlockTraceByNumber(chain, blockNumber) {
  const url = `${BASE_URL}/${chain}/block-trace/${blockNumber}`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  });
  return response.data;
}

async function getBlockTraceByNumberAndTxHash(chain, blockNumber, txHash) {
  const url = `${BASE_URL}/${chain}/block-trace/${blockNumber}/tx-hash/${txHash}`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  });
  return response.data;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async function () {
  try {
    const chain = 1; // Example chain
    const blockNumber = 15000000; // Example block number
    const txHash = "0x16897e492b2e023d8f07be9e925f2c15a91000ef11a01fc71e70f75050f1e03c"; // Example transaction hash

    const syncedInterval = await getSyncedInterval(chain);
    console.log("Synced Interval:", syncedInterval);

    await sleep(1000); // Sleep for 1 second to avoid rate limit

    const blockTrace = await getBlockTraceByNumber(chain, blockNumber);
    console.log("Block Trace:", blockTrace);

    await sleep(1000); // Sleep for 1 second to avoid rate limit

    const txTrace = await getBlockTraceByNumberAndTxHash(chain, blockNumber, txHash);
    console.log("Transaction Trace:", txTrace);
  } catch (error) {
    console.error("Error fetching data:", error.response ? error.response.data : error.message);
  }
})();