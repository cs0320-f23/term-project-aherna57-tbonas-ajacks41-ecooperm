import React, { useState } from "react";
import "../styles/FilterButtons.css";

interface FilterButtonsProps {
  category: string;
  options: string[];
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}
interface SelectedOptions {
  [key: string]: string;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  category,
  options,
  activeCategory,
  setActiveCategory,
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
      // Optionally, you can close the dropdown and deactivate the category
      setShowDropdown(false);
      setActiveCategory(null);
    }
  };

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
