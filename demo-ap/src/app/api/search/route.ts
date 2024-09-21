import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const searchTerm = formData.get('searchTerm') as string;

  const { protocol, host } = new URL(request.url);

  const redirectURL = new URL(`${protocol}//${host}/`);
  redirectURL.searchParams.set('searchTerm', searchTerm);

  return NextResponse.redirect(redirectURL);
}
