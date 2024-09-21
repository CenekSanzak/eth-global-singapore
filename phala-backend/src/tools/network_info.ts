import { getClient, Network, viemNetworks } from "./clients";
import { OnchainQueryTool } from ".";


async function getNetworkInfo(args: { network: string}) {
    // TODO: Add more information about the network
  const { network = 'mainnet' } = args;
  try {
    if (!viemNetworks.includes(network as any)) {
      throw new Error(`Invalid network: ${network}`);
    }
    const client = getClient(network as Network);
    const blockNumber = await client.getBlockNumber();
    return { networkInfo: `
Info about ${network}:
- Block number: ${blockNumber}
        `.trim() };
  } catch (error: any) {
    return { error: error.message };
  }
}

const toolDefinition = {   
    type: 'function',
    function: {
      name: 'getNetworkInfo',
      description: 'Get the balance of an Ethereum address',
      parameters: {
        type: 'object',
        properties: {
          network: {
            type: 'string',
            description: 'The network to check the balance on',
            default: 'mainnet',
            enum: ['mainnet', 'arbitrum', 'optimism', 'goerli'],
          },
        },
      },
    },
  }

export const networkInfoTool: OnchainQueryTool = {
    tool_definition: toolDefinition,
    function: getNetworkInfo,
};