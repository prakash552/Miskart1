import React, { useState, useEffect, useRef } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const SearchBarWithAutoComplete = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
    setActiveIndex(-1);
  }, [searchTerm, products]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // जब user सर्च करे या सेलेक्शन करे तब Categories पेज पर redirect करें
  const performSearch = (searchValue) => {
    setSearchTerm(searchValue);
    setShowSuggestions(false);
    // URL में query param के रूप में सर्च टर्म भेजें
    navigate(`/categories?search=${encodeURIComponent(searchValue)}`);
  };

  const handleClickSuggestion = (name) => {
    performSearch(name);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      if (activeIndex < filteredSuggestions.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        performSearch(filteredSuggestions[activeIndex].name);
      } else {
        performSearch(searchTerm);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const clearInput = () => {
    setSearchTerm("");
    setShowSuggestions(false);
    inputRef.current.focus();
  };

  return (
    <div className="search-bar-container">
      <AiOutlineSearch size={22} className="search-icon" />
      <input
        type="text"
        placeholder="Search gifts..."
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="search-bar-input"
        ref={inputRef}
        aria-autocomplete="list"
        aria-controls="search-suggestion-list"
        aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
      />
      {searchTerm && (
        <AiOutlineClose
          size={22}
          className="clear-icon"
          onClick={clearInput}
          aria-label="Clear search"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') clearInput(); }}
        />
      )}

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul id="search-suggestion-list" className={`suggestions-list`}>
          {filteredSuggestions.map((product, index) => (
            <li
              key={product.id}
              id={`suggestion-${index}`}
              className={`suggestion-item ${index === activeIndex ? "active" : ""}`}
              onClick={() => handleClickSuggestion(product.name)}
              onMouseEnter={() => setActiveIndex(index)}
              role="option"
              aria-selected={index === activeIndex}
              tabIndex={-1}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBarWithAutoComplete;
