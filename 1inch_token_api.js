import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const base_url = process.env.BASE_URL;
const headers = { "Authorization": `Bearer ${process.env.API_KEY}`, "accept": "application/json" };

export const search_tokens = async (query, chain_id, limit=10, ignore_listed="false") => {
    const endpoint = `/v1.2/${chain_id}/search`;
    const params = {
        "query": query,
        "limit": limit,
        "ignore_listed": ignore_listed
    }
    try {
        const response = await axios.get(base_url + endpoint, { headers, params });
        return response.data;
    } catch (error) {
        console.error(`Failed to search tokens. Error: ${error}`);
        return null;
    }
}

export const get_tokens_info = async (chain_id, addresses) => {
    const endpoint = `/v1.2/${chain_id}/custom/${addresses.join(',')}`;
    try {
        const response = await axios.get(base_url + endpoint, { headers });
        return response.data;
    } catch (error) {
        console.error(`Failed to get tokens info. Error: ${error}`);
        return null;
    }
}

export const get_all_tokens_info = async (chain_id, cf_ipcountry=null, provider="1inch", country=null) => {
    const endpoint = `/v1.2/${chain_id}`;
    const params = {
        "cf-ipcountry": cf_ipcountry,
        "provider": provider,
        "country": country
    }
    try {
        const response = await axios.get(base_url + endpoint, { headers, params });
        return response.data;
    } catch (error) {
        console.error(`Failed to get all tokens info. Error: ${error}`);
        return null;
    }
}

export const get_1inch_token_list = async (chain_id, cf_ipcountry=null, provider="1inch", country=null) => {
    const endpoint = `/v1.2/${chain_id}/token-list`;
    const params = {
        "cf-ipcountry": cf_ipcountry,
        "provider": provider,
        "country": country
    }
    try {
        const response = await axios.get(base_url + endpoint, { headers, params });
        return response.data;
    } catch (error) {
        console.error(`Failed to get 1inch token list. Error: ${error}`);
        return null;
    }
}
