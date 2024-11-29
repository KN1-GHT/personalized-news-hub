import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import useFetchNews from '../hooks/useFetchNews';

const Home = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('technology');
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, isError } = useFetchNews(page, query);

  // Save fetched data to localStorage
  useEffect(() => {
    if (data) {
      localStorage.setItem(`newsPage-${page}-${query}`, JSON.stringify(data));
    }
  }, [data, page, query]); 

  const handleSearch = () => {
    setPage(1); // Reset to page 1 for new search
    setQuery(searchTerm);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  };

  if (isLoading)
    return <div className="flex items-center justify-center h-screen text-center text-4xl">Loading...</div>;
  if (isError)
    return <div className="flex items-center justify-center h-screen text-center text-3xl text-red-600">Error loading news.</div>;

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-3xl text-center font-bold py-5 mb-5 bg-gray-400">Personalized News Hub</h1>

      <div className="flex justify-center items-center mb-6 text-dark">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-full max-w-md"
        />
        <button onClick={handleSearch} className="ml-4 p-2 px-4 bg-blue-500 rounded-md">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.articles?.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => handlePageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="bg-gray-400 p-2 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={data?.totalResults <= page * 10}
          className="bg-gray-400 p-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
