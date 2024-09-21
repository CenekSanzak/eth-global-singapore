import { Request, Response, route } from './httpSupport'



const RPC_URL = 'https://rpc.testnet.near.org'

async function GET(req: Request): Promise<Response> {
    let queries = req.queries || {}
    const contractName = queries.contractName ? queries.contractName[0] as string : "zimbirti.testnet";
    const methodName = queries.methodName ? queries.methodName[0] as string : "get_tools";
    const args: string = queries.args ? queries.args[0] as string : "";
    const argsBase64 = args == "" ? "" : Buffer.from(args).toString('base64');
    console.log(contractName, methodName, argsBase64);
    const response = await fetch(RPC_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: contractName,
            method: 'query',
            params: {
                finality: 'final',
                request_type: 'call_function',
                account_id: contractName,
                method_name: methodName,
                args_base64: argsBase64,    
            }
        })
    });

    const json = await response.json();
    const result = json.result.result as number[];

    return new Response(result.map((x: number) => String.fromCharCode(x)).join(''))
}

async function POST(req: Request): Promise<Response> {
    return new Response(JSON.stringify({message: 'Not Implemented'}))
}

export default async function main(request: string) {
    return await route({ GET, POST }, request)
}
