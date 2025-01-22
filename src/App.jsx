import React, { useState, useEffect } from "react";
import Autocomplete from "./Autocomplete";
import List from "./List";
import BookDetail from "./Detail";
import "./App.css";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filter, setFilter] = useState({ language: "", author: "" });

  const handleSearchChange = (query) => {
    setSearchText(query);
  };

  const handleFilterChange = (type, value) => {
    setFilter((prev) => ({ ...prev, [type]: value }));
  };

  const filteredResults = searchResults.filter((book) => {
    const matchesLanguage = filter.language ? book.languages.includes(filter.language) : true;
    const matchesAuthor = filter.author ? book.authors.some((author) => author.name.toLowerCase().includes(filter.author.toLowerCase())) : true;
    return matchesLanguage && matchesAuthor;
  });

  return (
    <div className="skibidi">
      <div className="app-container">
        <h1>Gutendex Book Search</h1>
        <Autocomplete onSearchChange={handleSearchChange} setSearchResults={setSearchResults} />
        <div className="filters">
          <label>
            Filter by Language:
            <select onChange={(e) => handleFilterChange("language", e.target.value)}>
              <option value="">All</option>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </label>
          <label>
            Filter by Author:
            <input type="text" placeholder="Author Name" onChange={(e) => handleFilterChange("author", e.target.value)} />
          </label>
        </div>
        <div className="content-container">
          <div className="list-container">
            <List books={filteredResults} onBookClick={setSelectedBook} />
          </div>
        </div>
      </div>
      <div className="detail-container">
            {selectedBook && <BookDetail bookId={selectedBook} />}
          </div>
    </div>
  );
};

export default App;