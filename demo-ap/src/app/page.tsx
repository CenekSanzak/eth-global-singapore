// src/app/page.tsx

import Image from 'next/image';
import { MagnifyingGlassIcon as Search } from '@heroicons/react/20/solid';
import { remark } from 'remark';
import html from 'remark-html';
import { headers } from 'next/headers';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const searchTerm = searchParams.searchTerm || '';
  let contentHtml = '';

  if (searchTerm) {
    // Construct the absolute URL for the API route
    const host = headers().get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const apiUrl = `${protocol}://${host}/api/search`;

    // Make a server-side fetch request to the API route
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchTerm }),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data from API: ${res.statusText}`);
    }

    const data = await res.json();
    const processedContent = await remark().use(html).process(data.result);
    contentHtml = processedContent.toString();
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <div className="flex items-center mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold flex items-end">
            Windmill
          </h1>
          <Image
            src="/windmill-logo.png"
            alt="Windmill Logo"
            width={140}
            height={140}
            className="ml-2"
          />
        </div>
        <form method="GET" action="/" className="w-full max-w-2xl mb-8">
          <div className="flex items-center border-2 border-gray-300 dark:border-gray-700 rounded-full overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <input
              type="text"
              name="searchTerm"
              defaultValue={searchTerm}
              placeholder="Ask a question..."
              className="flex-grow px-4 py-2 text-lg focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              type="submit"
              className="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300 rounded-full"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </form>
        {searchTerm && (
          <div
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        )}
      </main>
      <footer className="w-full py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2023 Windmill. All rights reserved.
      </footer>
    </div>
  );
}
