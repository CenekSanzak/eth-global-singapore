import { Account, Address, Chain, Client, createPublicClient,  http, ParseAccount, PublicClient, RpcSchema, Transport } from 'viem';
import { mainnet, arbitrum, optimism, goerli,  } from 'viem/chains';

export const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const arbitrumClient = createPublicClient({
  chain: arbitrum,
  transport: http(),
});

export const optimismClient = createPublicClient({
  chain: optimism,
  transport: http(),
});

export const viemNetworks = ['mainnet', 'arbitrum', 'optimism'] as const;

export type Network = (typeof viemNetworks)[number];


const clients: Record<Network, PublicClient|any> = {
  mainnet: mainnetClient,
  arbitrum: arbitrumClient,
  optimism: optimismClient,
};

export function getClient(network: Network): PublicClient{
  return clients[network];
}