import React, { SetStateAction, useState } from "react";
import { useDebounce } from "../hooks/useDebounce.js";
import styles from "../styles/RestaurantSearch.module.css";

interface SearchBarProps {
  fetchData: (value: string) => Promise<any[]>;
  setResult: (result: any) => void;
  suggestionKey: string;
}

interface SuggestionItem {
  [key: string]: string; // Adjust the type according to your actual data structure
}

const SearchBar: React.FC<SearchBarProps> = ({
  fetchData,
  setResult,
  suggestionKey,
}) => {
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [hideSuggestions, setHideSuggestions] = useState(true);

  const findResult = (value: string) => {
    setResult(
      suggestions.find((suggestion) => suggestion[suggestionKey] === value)
    );
  };

  useDebounce(
    async () => {
      try {
        const suggestions = await fetchData(value);

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
          placeholder="Search for a restaurant..."
          value={value}
          onChange={handleSearchInputChange}
        />
        <div className={styles.suggestions}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={styles.suggestion}
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

export default SearchBar;
