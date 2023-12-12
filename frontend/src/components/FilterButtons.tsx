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
  const [dropdownSelection, setDropdownSelection] = useState<string | null>(
    null
  );
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>();


  const handleButtonToggle = () => {
    if (activeCategory === category) {
      setActiveCategory(null);
      setShowDropdown(false);
    } else {
      setActiveCategory(category);
      setShowDropdown(true);
    }
  };

  const handleFilterDropdownSelect = (category: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [category]: option }));
    setDropdownSelection(option);
    console.log("Selected Filter:", category, option);
    setShowDropdown(false);
    setActiveCategory(null);
  };

  const renderDropdown = (category: string, options: string[]) => {
    return (
      <div className="dropdown">
        {options.map((option, index) => (
          <div
            key={index}
            className={`dropdown-item ${
              selectedOptions?.[category] === option ? "selected" : ""
            }`}
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
      className={`toggle-button ${selectedOptions?.[category] ? "selected" : ""} ${activeCategory === category ? "active" : ""}`}
      onClick={handleButtonToggle}
    >
      {selectedOptions?.[category] || category}
      {options && <span className="dropdown-icon">&#9660;</span>}
    </button>
    {activeCategory === category && renderDropdown(category, options)}
  </div>
);
};

export default FilterButtons;
