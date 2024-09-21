import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const searchTerm = body.searchTerm as string;

  const queryUrl = `https://wapo-testnet.phala.network/ipfs/${process.env.PHALA_CID}?key=${process.env.PHALA_KEY}&chatQuery=${searchTerm}`;

  const response = await fetch(queryUrl);
  const data = await response.json();
  const result = data.message;

  return NextResponse.json({ result });
}
