import React from 'react';

const NewsCard = ({ article }) => {
  const defaultImage = "https://via.placeholder.com/400x300?text=No+Image+Available"; 

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <img
        src={article.urlToImage || defaultImage} 
        alt={article.title || "No title available"} 
        className="w-full h-64 object-cover rounded-md"
      />
      <h3 className="font-bold text-lg mt-2">{article.title || "No title available"}</h3>
      <p className="text-gray-600 mt-2">
        {article.description || "Content has been removed."} {/* Fallback description */}
      </p>
      <a
        href={article.url || "#"} // Disable link if URL is missing
        target="_blank"
        rel="noopener noreferrer"
        className={`text-blue-500 mt-2 inline-block ${!article.url && "pointer-events-none text-gray-400"}`} // Disabled style
      >
        {article.url ? "Read more" : "Unavailable"}
      </a>
    </div>
  );
};

export default NewsCard;
