import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/Searchbar";
import Suggestions from "./components/suggestion";

function App() {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  return (
    <div className="App relative min-h-screen">
      <div className="container mx-auto flex flex-col justify-center items-center h-full overflow-y-scroll">
        <Suggestions />
      </div>

      <div className="container mx-auto flex flex-col justify-center items-center fixed bottom-0 z-10">
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
}

export default App;
