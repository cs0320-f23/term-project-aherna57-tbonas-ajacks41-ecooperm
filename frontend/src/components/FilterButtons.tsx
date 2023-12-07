import React, { useState } from "react";

interface FilterButtonsProps {
  category: string; // Add the category prop
  options: string[];
  activeButton: string | null;
  onButtonToggle: (category: string) => void;
  onDropdownSelect: (category: string, option: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  category,
  options,
  activeButton,
  onButtonToggle,
  onDropdownSelect,
}) => {
  const renderDropdown = () => {
    return (
      <div className="dropdown">
        {options.map((option, index) => (
          <div
            key={index}
            className="dropdown-item"
            onClick={() => onDropdownSelect(category, option)}
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
        onClick={() => onButtonToggle(category)}
      >
        {category}
        {options && <span className="dropdown-icon">&#9660;</span>}
      </button>
      {options && activeButton === category && renderDropdown()}
    </div>
  );
};

export default FilterButtons;