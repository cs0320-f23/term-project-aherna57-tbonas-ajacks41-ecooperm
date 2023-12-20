import React, { useState, useEffect } from "react";
import "../styles/FilterButtons.css";


/**The FilterButtons component is a React functional component designed to create a filter button 
 * with an associated dropdown menu. It takes in various props, such as the filter category label, 
 * available options, the currently active category, a function to set the active category, and a reset key. 
 * The component manages the state of the dropdown visibility and the selected filter option, providing user 
 * interaction to toggle filters and make selections. It also includes a reset functionality triggered by changes in the reset key. 
 * The component's purpose is to enhance user interface elements by allowing dynamic filtering based on the provided options. */

// Props interface for the FilterButtons component
interface FilterButtonsProps {
  category: string;
  options: string[];
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  resetKey: number;
}
interface SelectedOptions {
  [key: string]: string;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  category,
  options,
  activeCategory,
  setActiveCategory,
  resetKey, 
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleButtonToggle = () => {
    if (selectedOption === "All" || selectedOption === "None") {
      // If "All" or "None" is selected, immediately revert to the original state
      setActiveCategory(null);
      setShowDropdown(false);
      setSelectedOption(null);
    } else if (activeCategory === category) {
      setActiveCategory(null);
      setShowDropdown(false);
    } else {
      setActiveCategory(category);
      setShowDropdown(true);
    }
  };

  const handleFilterDropdownSelect = (option: string) => {
    // If "All" or "None" is selected, immediately revert to the original state
    if (option === "All" || option === "None") {
      setActiveCategory(null);
      setShowDropdown(false);
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
      setShowDropdown(false);
      setActiveCategory(null);
    }
  };

  useEffect(() => {
    setActiveCategory(null);
    setShowDropdown(false);
    setSelectedOption(null);
  }, [resetKey]);

  const renderDropdown = () => {
    return (
      <div className="dropdown">
        {options.map((option, index) => (
          <div
            key={index}
            className={`dropdown-item ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => handleFilterDropdownSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="button-container">
      <button
        className={`toggle-button ${selectedOption ? "selected" : ""} ${
          activeCategory === category ? "active" : ""
        }`}
        onClick={handleButtonToggle}
      >
        {selectedOption || category}
        {options && <span className="dropdown-icon">&#9660;</span>}
      </button>
      {activeCategory === category && renderDropdown()}
    </div>
  );
};

export default FilterButtons;
