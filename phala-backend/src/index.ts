import { Request, Response, route } from './httpSupport'
import OpenAI from 'openai'
import { balanceTool } from './tools/getBalance';
import { networkInfoTool } from './tools/network_info';
import { OnchainQueryTool } from './tools';
import { getBlockTraceByNumberAndTxHashTool, getBlockTraceByNumberTool, getSyncedIntervalTool, getTokenDetailsTool, tokenBalancesTool, currentValueTool, getHistoryTool, checkIfWalletFraudTool } from './tools/1inchTrace'

const allTools = [
    balanceTool,
    networkInfoTool,
    getBlockTraceByNumberAndTxHashTool,
    getBlockTraceByNumberTool,
    getSyncedIntervalTool,
    getTokenDetailsTool,
    tokenBalancesTool,
    currentValueTool,
    getHistoryTool,
    checkIfWalletFraudTool
]
const tools =  allTools.map((tool) => tool.tool_definition);

const availableTools:{
    [key: string]: CallableFunction
} = allTools.reduce((acc: 
    {[key: string]: CallableFunction},
     tool: OnchainQueryTool) => {
    acc[tool.tool_definition?.function?.name ] = tool.function;
    return acc;
}, {});

type MessageInfo = {
    role: any,
    content: any,
    name?: any,
}
const SYSTEM_PROMPT = `
You are a helpful assistant that helps users explore onchain data. 
You can provide information about Ethereum addresses, transactions, and more. Use Markdown to format your responses.
Only use the functions you have been provided with.
Tool usage limit is 5, so try to finish your response within 5 tool calls.
Exception: If you are Fraud detecting, do not forget to give a percentage to show the confidence level.
`.trim();
const messages: MessageInfo[] = [
    {
        role: "system",
        content: SYSTEM_PROMPT,
    },
];

async function agent(openai: any, userInput: any) {
    messages.push({
        role: "user",
        content: userInput,
    });

    for (let i = 0; i < 8; i++) {
        console.log(`[${i}]chat`)
        const toolsToUse = i<5 ? tools : undefined;
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            tools: toolsToUse,
        });

        const { finish_reason, message } = response.choices[0];

        if (finish_reason === "tool_calls" && message.tool_calls) {
            const functionName:string = message.tool_calls[0].function.name;
            const functionToCall = availableTools[functionName];
            const functionArgs = JSON.parse(message.tool_calls[0].function.arguments);
            const functionResponse = await functionToCall(functionArgs)

            messages.push({
                role: "function",
                name: functionName,
                content: `
                The result of the last function was this: ${JSON.stringify(
                    functionResponse
                )}
                `.trim(),
            });
        } else if (finish_reason === "stop") {
            messages.push(message);
            console.log(messages);
            return message.content;
        }
    }
    return "The maximum number of iterations has been met without a suitable answer. Please try again with a more specific input.";
}

async function GET(req: Request): Promise<Response> {
    let result = { message: '' }
    const secrets = req.secret || {}
    const queries = req.queries
    const openaiApiKey = (secrets.openaiApiKey) ? secrets.openaiApiKey as string : ''
    const openai = new OpenAI({ apiKey: openaiApiKey,   baseURL: 'https://api.red-pill.ai/v1',})
    const query = (queries.chatQuery) ? queries.chatQuery[0] as string : 'What are some activities to do in Austin, Texas today?'

    const response = await agent(openai, query)
    result.message = response as string;

    return new Response(JSON.stringify(result))
}

async function POST(req: Request): Promise<Response> {
    return new Response(JSON.stringify({message: 'Not Implemented'}))
}

export default async function main(request: string) {
    return await route({ GET, POST }, request)
}
