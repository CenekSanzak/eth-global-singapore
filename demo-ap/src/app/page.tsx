import Image from 'next/image';
import { MagnifyingGlassIcon as Search

} from '@heroicons/react/20/solid';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const searchTerm = searchParams.searchTerm || '';
  const results = searchTerm ? [`Result for "${searchTerm}"`] : [];

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
        <form method="POST" action="/api/search" className="w-full max-w-2xl mb-8">
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
        <div className="w-full max-w-2xl">
          {results.length > 0 && (
            <div>
              <ul className="space-y-4">
                {results.map((result, index) => (
                  <li
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-transform duration-300 hover:scale-105"
                  >
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
      <footer className="w-full py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2023 Windmill. All rights reserved.
      </footer>
    </div>
  );
}
