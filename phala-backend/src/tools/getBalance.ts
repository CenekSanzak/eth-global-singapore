import { getClient, Network, viemNetworks } from "./clients";
import { formatEther } from "viem";
import { OnchainQueryTool } from ".";


async function getBalance(args: {address: `0x{string}`, network: string}) {
  const { address, network = 'mainnet' } = args;
  try {
    if (!viemNetworks.includes(network as any)) {
      throw new Error(`Invalid network: ${network}`);
    }
    const client = getClient(network as Network);
    const balance = await client.getBalance({ address });
    return { balance:
        `In: ${network}. as wei: ${balance.toString()}, as ether: ${formatEther(balance)}`
        };
  } catch (error: any) {
    return { error: error.message };
  }
}

const toolDefinition = {   
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
          network: {
            type: 'string',
            description: 'The network to check the balance on',
            default: 'mainnet',
            enum: ['mainnet', 'arbitrum', 'optimism', 'goerli'],
          },
        },
        required: ['address'],
      },
    },
  }

export const balanceTool: OnchainQueryTool = {
    tool_definition: toolDefinition,
    function: getBalance,
};