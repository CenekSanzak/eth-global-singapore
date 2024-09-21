import { OnchainQueryTool } from ".";
const axios = require("axios");
import OpenAI from 'openai'
//TODO: returnleri düzelt
const BASE_URL_TRACE = "https://api.1inch.dev/traces/v1.0/chain";
const headers = { "Authorization": `Bearer qnKvtzyL7lc7K8DiuL0GCcksuXi0Te9p`, "accept": "application/json" };
const chain_ids = {
    "RabbitHole": 1,
    "Aurora": 1313161554,
    "Arbitrum": 42161,
    "Avalanche": 43114,
    "Base": 8453,
    "Binance Smart Chain": 56,
    "Fantom": 250,
    "Gnosis Chain": 100,
    "Klaytn Chain": 8217,
    "Optimistic Ethereum": 10,
    "Polygon": 137,
    "zkSync Era": 324
}
type MessageInfo = {
    role: any,
    content: any,
    name?: any,
}

async function checkIfWalletFraud({walletAddress, chainName}: {walletAddress: string, chainName: string}) {
    const transaction_history = await getHistory({chainName, walletAddress, limit: 20});
    return `You are a helpful assistant that helps users to check if a wallet is fraudulent.
Below is some transactions from the wallet on a specific chain.
You need to analyze the transactions and determine if the wallet is fraudulent.
You need to provide a percentage to indicate the likelihood of fraud.
${JSON.stringify(transaction_history)}`;
}



async function getHistory({chainName, walletAddress, limit}: {chainName: string, walletAddress: string, limit: number}) {
    let chain = chain_ids[chainName as keyof typeof chain_ids];
    const url = `https://api.1inch.dev/history/v2.0/history/${walletAddress}/events?chainId=${chain}&limit=${limit}`;
    const response = await fetch(url, { headers });
    return response.json();
}

async function getSyncedInterval({chainName}: {chainName: string}) {
    let chain = chain_ids[chainName as keyof typeof chain_ids];
    const url = `${BASE_URL_TRACE}/${chain}/synced-interval`;
    const response = await fetch(url, { headers });
    return response.json();
    
}
  
async function getBlockTraceByNumber({chainName, blockNumber}: {chainName: string, blockNumber: number}) {
    let chain = chain_ids[chainName as keyof typeof chain_ids];
    const url = `${BASE_URL_TRACE}/${chain}/block-trace/${blockNumber}`;
    const response = await fetch(url, { headers });
    return response.json();
}
  
async function getBlockTraceByNumberAndTxHash({chainName, blockNumber, txHash}: {chainName: string, blockNumber: number, txHash: string}) {
    let chain = chain_ids[chainName as keyof typeof chain_ids];
    const url = `${BASE_URL_TRACE}/${chain}/block-trace/${blockNumber}/tx-hash/${txHash}`;
    const response = await fetch(url, { headers });
    return response.json();
}

async function getTokenDetails({walletAddress, chainId}: {walletAddress: string, chainId: number}) {
    const endpoint = `https://api.1inch.dev/portfolio/portfolio/v4/overview/erc20/details?addresses=${walletAddress}&chain_id=${chainId}`;
    const data = await fetch(endpoint, {
      headers: { Authorization: `Bearer qnKvtzyL7lc7K8DiuL0GCcksuXi0Te9p` }
    }).then((res) => res.json());
    return data;
}

async function getTokenBalances({walletAddress}: {walletAddress: string}) {
    try {
        const response = await axios.get('https://api.1inch.dev/balance/v1.2/1/balances/' + walletAddress, { headers });
        return response.data;
    } catch (error) {
        console.error(`Failed to get token balances. Error: ${error}`);
        return null;
    }
}

async function getCurrentValue({walletAddress, chainName}: {walletAddress: string, chainName: string}) {
    const chain_ids = {
        "RabbitHole": 1,
        "Aurora": 1313161554,
        "Arbitrum": 42161,
        "Avalanche": 43114,
        "Base": 8453,
        "Binance Smart Chain": 56,
        "Fantom": 250,
        "Gnosis Chain": 100,
        "Klaytn Chain": 8217,
        "Optimistic Ethereum": 10,
        "Polygon": 137,
        "zkSync Era": 324
    }
    let chainId = chain_ids[chainName as keyof typeof chain_ids];   
    const endpoint = `https://api.1inch.dev/portfolio/portfolio/v4/overview/erc20/current_value?addresses=${walletAddress}&chain_id=${chainId}`;
    const data = await fetch(endpoint, {
      headers: { Authorization: `Bearer qnKvtzyL7lc7K8DiuL0GCcksuXi0Te9p` }
    }).then((res) => res.json());
    return data;
}

const toolDefinitionCheckIfWalletFraud = {
    type: 'function',
    function: {
        name: 'CheckIfWalletFraud',
        description: 'use this tool to get the transaction history of a wallet in order to determine if it is fraudulent',
        parameters: {
            type: 'object',
            properties: {
                walletAddress: {
                    type: 'string',
                    description: 'The address to check for fraud',
                },
                chainName: {
                    type: 'string',
                    description: 'The chain name to check for fraud on',
                    default: 'Binance Smart Chain',
                    enum: ['RabbitHole', 'Aurora', 'Arbitrum', 'Avalanche', 'Base', 'Binance Smart Chain', 'Fantom', 'Gnosis Chain', 'Klaytn Chain', 'Optimistic Ethereum', 'Polygon', 'zkSync Era'],
                },
            },
            required: ['walletAddress', 'chainName'],
        },
    },
}

const toolDefinitionGetHistory = {
    type: 'function',
    function: {
        name: 'getHistory',
        description: 'Get the history of a wallet in a given chain',
        parameters: {
            type: 'object',
            properties: {
                walletAddress: {
                    type: 'string',
                    description: 'The address to check the history of',
                },
                chainName: {
                    type: 'string',
                    description: 'The chain name to check the history on',
                    default: 'RabbitHole',
                    enum: ['RabbitHole', 'Aurora', 'Arbitrum', 'Avalanche', 'Base', 'Binance Smart Chain', 'Fantom', 'Gnosis Chain', 'Klaytn Chain', 'Optimistic Ethereum', 'Polygon', 'zkSync Era'],
                },
                limit: {
                    type: 'number',
                    description: 'The limit of the history to get',
                    default: 10,
                },
            },
            required: ['walletAddress', 'chainName', 'limit'],
        },
    },
}


const toolDefinitionGetCurrentValue = {   
    type: 'function',
    function: {
        name: 'getCurrentValue',
        description: 'Get the current value of a portfolio',
        parameters: {
            type: 'object',
            properties: {
            walletAddress: {
                type: 'string',
                description: 'The address to check the value of',
            },
            chainName: {
                type: 'string',
                description: 'The chain name to check the value on',
                default: 'RabbitHole',
                enum: ['RabbitHole', 'Aurora', 'Arbitrum', 'Avalanche', 'Base', 'Binance Smart Chain', 'Fantom', 'Gnosis Chain', 'Klaytn Chain', 'Optimistic Ethereum', 'Polygon', 'zkSync Era'],
            },
            },
            required: ['walletAddress', 'chainName'],
        },
    },
}


const toolDefinitionGetTokenBalances = {
    type: 'function',
    function: {
        name: 'getTokenBalances',
        description: 'Get the token balances of a wallet',
        parameters: {
            type: 'object',
            properties: {
                walletAddress: {
                    type: 'string',
                    description: 'The address to check the token balances of',
                },
            },
            required: ['walletAddress'],
        },
    },
}



const toolDefinitionTokenDetails = {   
    type: 'function',
    function: {
        name: 'getTokenDetails',
        description: 'Get the details of a token',
        parameters: {
            type: 'object',
            properties: {
            walletAddress: {
                type: 'string',
                description: 'The address to check the token details of',
            },
            chainId: {
                type: 'number',
                description: 'The chain ID to check the token details on',
                default: 1,
            },
            },
            required: ['walletAddress', 'chainId'],
        },
    },
}


const toolDefinitionGetSyncedInterval = {
    type: 'function',
    function: {
        name: 'getSyncedInterval',
        description: 'Get the synced interval of a chain',
        parameters: {
            type: 'object',
            properties: {
                chainName: {
                    type: 'string',
                    description: 'The chain name to get the synced interval of',
                    default: 'RabbitHole',
                    enum: ['RabbitHole', 'Aurora', 'Arbitrum', 'Avalanche', 'Base', 'Binance Smart Chain', 'Fantom', 'Gnosis Chain', 'Klaytn Chain', 'Optimistic Ethereum', 'Polygon', 'zkSync Era'],
                },
            },
            required: ['chainName'],
        },
    },
}

const toolDefinitionGetBlockTraceByNumber = {
    type: 'function',
    function: {
        name: 'getBlockTraceByNumber',
        description: 'Get the block trace by number',
        parameters: {
            type: 'object',
            properties: {
                chainName: {
                    type: 'string',
                    description: 'The chain name to get the block trace of',
                    default: 'RabbitHole',
                    enum: ['RabbitHole', 'Aurora', 'Arbitrum', 'Avalanche', 'Base', 'Binance Smart Chain', 'Fantom', 'Gnosis Chain', 'Klaytn Chain', 'Optimistic Ethereum', 'Polygon', 'zkSync Era'],
                },
                blockNumber: {
                    type: 'number',
                    description: 'The block number to get the trace of',
                },
            },
            required: ['chainName', 'blockNumber'],
        },
    },
}

const toolDefinitionGetBlockTraceByNumberAndTxHash = {
    type: 'function',
    function: {
        name: 'getBlockTraceByNumberAndTxHash',
        description: 'Get the block trace by number and transaction hash',
        parameters: {
            type: 'object',
            properties: {
                chainName: {
                    type: 'string',
                    description: 'The chain name to get the block trace of',
                    default: 'RabbitHole',
                    enum: ['RabbitHole', 'Aurora', 'Arbitrum', 'Avalanche', 'Base', 'Binance Smart Chain', 'Fantom', 'Gnosis Chain', 'Klaytn Chain', 'Optimistic Ethereum', 'Polygon', 'zkSync Era'],
                },
                blockNumber: {
                    type: 'number',
                    description: 'The block number to get the trace of',
                },
                txHash: {
                    type: 'string',
                    description: 'The transaction hash to get the trace of',
                },
            },
            required: ['chainName', 'blockNumber', 'txHash'],
        },
    },
}


export const getSyncedIntervalTool: OnchainQueryTool = {
    tool_definition: toolDefinitionGetSyncedInterval,
    function: getSyncedInterval,
};

export const getBlockTraceByNumberTool: OnchainQueryTool = {
    tool_definition: toolDefinitionGetBlockTraceByNumber,
    function: getBlockTraceByNumber,
};

export const getBlockTraceByNumberAndTxHashTool: OnchainQueryTool = {
    tool_definition: toolDefinitionGetBlockTraceByNumberAndTxHash,
    function: getBlockTraceByNumberAndTxHash,
};

export const getTokenDetailsTool: OnchainQueryTool = {
    tool_definition: toolDefinitionTokenDetails,
    function: getTokenDetails,
};


export const tokenBalancesTool: OnchainQueryTool = {
    tool_definition: toolDefinitionGetTokenBalances,
    function: getTokenBalances,
};


export const currentValueTool: OnchainQueryTool = {
    tool_definition: toolDefinitionGetCurrentValue,
    function: getCurrentValue,
};

export const getHistoryTool: OnchainQueryTool = {
    tool_definition: toolDefinitionGetHistory,
    function: getHistory,
};

export const checkIfWalletFraudTool: OnchainQueryTool = {
    tool_definition: toolDefinitionCheckIfWalletFraud,
    function: checkIfWalletFraud,
};