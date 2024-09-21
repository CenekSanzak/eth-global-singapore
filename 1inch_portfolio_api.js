require("dotenv").config();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getCurrentValue(walletAddress, chainId) {
  const endpoint = `https://api.1inch.dev/portfolio/portfolio/v4/overview/erc20/current_value?addresses=${walletAddress}&chain_id=${chainId}`;
  const data = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${process.env.API_KEY}` }
  }).then((res) => res.json());
  return data;
}

async function getProfitAndLoss(walletAddress, chainId, fromTimestamp, toTimestamp) {
    const endpoint = `https://api.1inch.dev/portfolio/portfolio/v4/overview/erc20/profit_and_loss?addresses=${walletAddress}&chain_id=${chainId}&from_timestamp=${fromTimestamp}&to_timestamp=${toTimestamp}`;
    const data = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${process.env.API_KEY}` }
    }).then((res) => res.json());
    return data;
  }
  
async function getTokenDetails(walletAddress, chainId) {
    const endpoint = `https://api.1inch.dev/portfolio/portfolio/v4/overview/erc20/details?addresses=${walletAddress}&chain_id=${chainId}`;
    const data = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${process.env.API_KEY}` }
    }).then((res) => res.json());
    return data;
  }

