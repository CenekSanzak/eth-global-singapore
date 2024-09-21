import { Request, Response, route } from './httpSupport'
import { createPublicClient, formatEther, http } from 'viem';
import { mainnet } from 'viem/chains';
import OpenAI from 'openai'

// Initialize the Viem client
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

async function getBalance(address: `0x{string}`) {
  try {
    const balance = await client.getBalance({ address });
    return { balance:
        `As wei: ${balance.toString()}, as ether: ${formatEther(balance)}`
        };
  } catch (error: any) {
    return { error: error.message };
  }
}

const tools = [
  {
    type: 'function',
    function: {
      name: 'getBalance',
      description: 'Get the balance of an Ethereum address',
      parameters: {
        type: 'object',
        properties: {
          address: {
            type: 'string',
            description: 'The Ethereum address to check the balance of',
          },
        },
        required: ['address'],
      },
    },
  },
];

const availableTools = {
    getBalance,
};

type MessageInfo = {
    role: any,
    content: any,
    name?: any,
}
const SYSTEM_PROMPT = `
You are a helpful assistant that helps users explore onchain data. 
You can provide information about Ethereum addresses, transactions, and more. Use Markdown to format your responses.
Only use the functions you have been provided with.
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

    for (let i = 0; i < 5; i++) {
        console.log(`[${i}]chat`)
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            tools: tools,
        });

        const { finish_reason, message } = response.choices[0];

        if (finish_reason === "tool_calls" && message.tool_calls) {
            const functionName:string = message.tool_calls[0].function.name;
            const functionToCall = availableTools[functionName];
            const functionArgs = JSON.parse(message.tool_calls[0].function.arguments);
            const functionArgsArr = Object.values(functionArgs);
            const functionResponse = await functionToCall.apply(
                null,
                functionArgsArr
            );

            messages.push({
                role: "function",
                name: functionName,
                content: `
                The result of the last function was this: ${JSON.stringify(
                    functionResponse
                )}
                `,
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
