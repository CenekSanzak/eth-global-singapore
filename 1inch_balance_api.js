// import requests

// def get_token_balances(wallet_address):
//     endpoint = f'https://api.1inch.dev/balance/v1.2/1/balances/{wallet_address}'
//     response = requests.get(endpoint, headers={'Authorization': f'Bearer YOUR-API-KEY'})

//     if response.status_code == 200:
//         return response.json()
//     else:
//         print(f"Failed to fetch token balances. Error code: {response.status_code}")
//         return None

// def main():
//     # Replace '0xYourWalletAddress' with the Ethereum wallet address you want to check
//     wallet_address = '0xYourWalletAddress'
//     token_balances = get_token_balances(wallet_address)

//     if token_balances:
//         print(f"Token balances for wallet address {wallet_address}:")
//         for token, balance in token_balances.items():
//             print(f"{token}: {balance}")
//     else:
//         print("Token balance fetch failed. Please check your wallet address.")

//make all this with token_balances null check a javascript function

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const headers = { "Authorization": `Bearer ${process.env.API_KEY}`};

export const get_token_balances = async (wallet_address) => {
    const endpoint = `/v1.2/1/balances/${wallet_address}`;
    try {
        const response = await axios.get(base_url + endpoint, { headers });
        return response.data;
    } catch (error) {
        console.error(`Failed to get token balances. Error: ${error}`);
        return null;
    }
}

