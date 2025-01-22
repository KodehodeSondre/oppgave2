import React, { useState, useEffect } from "react";

const Autocomplete = ({ onSearchChange, setSearchResults }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 3) {
        setSearchResults([]);
        return;
      }
      const response = await fetch(`https://gutendex.com/books?search=${query}`);
      const data = await response.json();
      setSearchResults(data.results);
    };

    const debounceFetch = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceFetch);
  }, [query, setSearchResults]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearchChange(value);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Autocomplete;
