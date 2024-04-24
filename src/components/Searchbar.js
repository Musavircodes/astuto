import React, { useState } from "react";
import { FiArrowRight, FiCode } from "react-icons/fi"; // Import the search icon from react-icons

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-4/5 flex items-center justify-between px-4 py-2 bg-white rounded-2xl shadow-md"
    >
      <input
        type="text"
        placeholder="Start typing your query here..."
        value={query}
        onChange={handleInputChange}
        className="px-2 py-2 border-none bg-transparent focus:outline-none flex-1"
      />
      <button
        type="submit"
        className="flex items-center justify-center w-8 h-8 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <FiCode color="grey" />
      </button>
      <button
        type="submit"
        className="flex items-center justify-center w-8 h-8 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <FiArrowRight color="grey" />
      </button>
    </form>
  );
};

export default SearchBar;
