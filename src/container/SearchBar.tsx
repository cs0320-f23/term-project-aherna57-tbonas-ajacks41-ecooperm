import React, { SetStateAction, useState } from "react";
import { useDebounce } from "../hooks/useDebounce.js";
import styles from "../styles/RestaurantSearch.module.css";
import router from "next/router";


/** The SearchBar component is a React functional component responsible for rendering a search input with dynamic suggestions. 
 * It interacts with a parent component by utilizing props, such as fetchData for fetching suggestions based on input, setResult 
 * for updating the result based on a selected suggestion, and suggestionKey for specifying the key within the suggestion items. 
 * The component includes debouncing functionality, input focus and blur handlers, and maps over suggestions to display them in a dropdown. */

// Definition of SearchBarProps interface to describe the expected props for the SearchBar component
interface SearchBarProps {
  fetchData: (value: string) => string[];
  setResult: (result: any) => void; // setResult now takes an array
  restaurants: any;
}

// Definition of SuggestionItem interface to describe the structure of suggestion items
interface SuggestionItem {
  [key: string]: string; // Adjust the type according to your actual data structure
}

// Functional component definition for the SearchBar component
const SearchBar: React.FC<SearchBarProps> = ({ fetchData, setResult, restaurants }) => {
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [hideSuggestions, setHideSuggestions] = useState(true);

  console.log("restaurants", restaurants);

  const findResult = (value: string) => {
    const filteredRestaurants = restaurants.filter((restaurant: any) =>
      restaurant.name.toLowerCase().includes(value.toLowerCase())
    );
    const restaurantId = filteredRestaurants[0].id; 
    router.push(`/restaurants/${restaurantId}`);
  };

  useDebounce(
    () => {
      try {
        const suggestions = fetchData(value);
        setSuggestions(suggestions || []);
      } catch (error) {
        console.log(error);
      }
    },
    1000,
    [value]
  );

  const handleFocus = () => {
    setHideSuggestions(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setHideSuggestions(true);
    }, 200);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="container">
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="search"
          className="textbox"
          placeholder="Search..."
          value={value}
          onChange={handleSearchInputChange}
        />
        {!hideSuggestions && (
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion"
                onClick={() => findResult(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;