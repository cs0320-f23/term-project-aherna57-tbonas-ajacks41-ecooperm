import React, { useState } from "react";
import "../styles/FilterButtons.css";

interface FilterButtonsProps {
  category: string;
  options: string[];
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  category,
  options,
}) => {

  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [dropdownSelection, setDropdownSelection] = useState<string | null>(
    null
  );

  const handleButtonToggle = (buttonName: string) => {
    setActiveButton((prev) => (prev === buttonName ? null : buttonName));
    setShowDropdown((prev) => !prev);
    setDropdownSelection(null); // Reset dropdown selection when toggling buttons
  };

  const handleFilterDropdownSelect = (category: string, option: string) => {
    setDropdownSelection(option);
    console.log("Selected Filter:", category, option);
  };

  const renderDropdown = (category: string, options: string[]) => {
    console.log("Rendering dropdown for category:", category);
    return (
      <div className="dropdown">
        {options.map((option, index) => (
          <div
            key={index}
            className="dropdown-item"
            onClick={() => handleFilterDropdownSelect(category, option)}
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
        className={`toggle-button ${activeButton === category ? "active" : ""}`}
        onClick={() => handleButtonToggle(category)}
      >
        {category}
        {options && <span className="dropdown-icon">&#9660;</span>}
      </button>
      {options && showDropdown && renderDropdown(category, options)}
    </div>
  );
};


export default FilterButtons;
