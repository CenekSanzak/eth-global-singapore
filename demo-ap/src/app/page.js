"use client"; // Add this line at the top

import { useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // For demonstration, we will just echo the search term
    setResults([`Result for "${searchTerm}"`]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Page</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="What do you want to search for?"
        />
        <button type="submit">Search</button>
      </form>
      <div style={{ marginTop: '20px' }}>
        {results.map((result, index) => (
          <div key={index}>{result}</div>
        ))}
      </div>
    </div>
  );
}
