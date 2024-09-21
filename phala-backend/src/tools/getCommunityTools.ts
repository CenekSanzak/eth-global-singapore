import { OnchainQueryTool } from "."
const RPC_URL = 'https://rpc.testnet.near.org'

export async function toQueryTool(community_tool: {name: string, query_url: string, json_schema: string}): Promise<OnchainQueryTool> {
    const query_url = community_tool.query_url
    const schema_str = community_tool.json_schema
    const schema = JSON.parse(schema_str)

    return {
        tool_definition: schema,
        function: async (args:any) => {
            const parsedUrl = new URL(query_url);
            const parsedParams = new URLSearchParams(parsedUrl.search);
            for (const key in args) {
                parsedParams.set(key, args[key])
            }
            parsedUrl.search = parsedParams.toString()
            const response = await fetch(parsedUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        }
    }
}

export async function getCommunityTools(): Promise<OnchainQueryTool[]> {
    const response = await fetch(RPC_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: "zimbirti.testnet",
            method: 'query',
            params: {
                finality: 'final',
                request_type: 'call_function',
                account_id: "zimbirti.testnet",
                method_name: "get_tools",
                args_base64: "",    
            }
        })
    });

    const json = await response.json();
    const result = json.result.result as number[];
    const tools = await Promise.all(JSON.parse(result.map((x: number) => String.fromCharCode(x)).join('')).map(toQueryTool))
    console.log(tools)
    return tools
}