import React, { SetStateAction, useState } from "react";
import { useDebounce } from "../hooks/useDebounce.js";
import "../styles/RestaurantSearch.css";

/** The SearchBar component is a React functional component responsible for rendering a search input with dynamic suggestions. 
 * It interacts with a parent component by utilizing props, such as fetchData for fetching suggestions based on input, setResult 
 * for updating the result based on a selected suggestion, and suggestionKey for specifying the key within the suggestion items. 
 * The component includes debouncing functionality, input focus and blur handlers, and maps over suggestions to display them in a dropdown. */

// Definition of SearchBarProps interface to describe the expected props for the SearchBar component
interface SearchBarProps {
  fetchData: (value: string) => Promise<any[]>;
  setResult: (result: any) => void;
  suggestionKey: string;
}

// Definition of SuggestionItem interface to describe the structure of suggestion items
interface SuggestionItem {
  [key: string]: string; // Adjust the type according to your actual data structure
}

// Functional component definition for the SearchBar component
const SearchBar: React.FC<SearchBarProps> = ({
  fetchData,
  setResult,
  suggestionKey,
}) => {
  // State variables for input value, suggestions, and hiding suggestions
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [hideSuggestions, setHideSuggestions] = useState(true);

  // Function to find a result based on the selected suggestion
  const findResult = (value: string) => {
    setResult(
      suggestions.find((suggestion) => suggestion[suggestionKey] === value)
    );
  };

  // Custom hook for debouncing the fetchData function
  useDebounce(
    async () => {
      try {
        // Fetch suggestions based on the input value
        const suggestions = await fetchData(value);

        // Update the suggestions state with the fetched suggestions
        setSuggestions(suggestions || []);
      } catch (error) {
        console.log(error);
      }
    },
    1000, // Debounce delay in milliseconds
    [value] // Dependencies for the debounce hook
  );

  // Event handler for input focus
  const handleFocus = () => {
    setHideSuggestions(false);
  };

  // Event handler for input blur
  const handleBlur = () => {
    // Delay hiding suggestions to prevent premature hiding on click
    setTimeout(() => {
      setHideSuggestions(true);
    }, 200);
  };

  // Event handler for input value change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      {/* SearchBar container */}
      <div className="container">
        {/* Input element for search */}
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="search"
          className="textbox"
          placeholder="Search for a restaurant..."
          value={value}
          onChange={handleSearchInputChange}
        />
        {/* Suggestions dropdown */}
        <div className="suggestions">
          {/* Map over suggestions and display each suggestion */}
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion"
              onClick={() => findResult(suggestion[suggestionKey])}
            >
              {suggestion[suggestionKey]}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Default export for the SearchBar component
export default SearchBar;
