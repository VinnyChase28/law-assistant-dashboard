"use client";

import React, { useState } from "react";
import { api } from "src/trpc/react"; // Adjust the import path as needed

const VectorSearchComponent = () => {
  const [queryVector, setQueryVector] = useState([]); // Initial vector
  const [submitSearch, setSubmitSearch] = useState(false);

  // Use the vectorSearch query from your tRPC router
  // The query is only enabled when `submitSearch` is true
  const { data: searchResults, isLoading } = api.file.vectorSearch.useQuery(
    {
      queryVector: queryVector, // Provide initial query vector
      topK: 5, // Optional: number of top results to return
    },
    {
      enabled: submitSearch,
      keepPreviousData: true, // Keep showing previous data until new data is loaded
    },
  );

  const handleSearch = () => {
    setSubmitSearch(true); // Enable the query
  };

  // Reset the query state
  const resetSearch = () => {
    setSubmitSearch(false);
  };

  return (
    <div>
      <div>
        {/* Implement UI logic to capture and set the query vector */}
        {/* Input fields to set the query vector */}
      </div>
      <button onClick={handleSearch} disabled={isLoading}>
        Search
      </button>
      <button onClick={resetSearch} disabled={isLoading}>
        Reset
      </button>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          searchResults?.map((file, index) => (
            <div key={index}>
              {/* Display file details */}
              <p>{file.name}</p>
              {/* Add more details as needed */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VectorSearchComponent;
