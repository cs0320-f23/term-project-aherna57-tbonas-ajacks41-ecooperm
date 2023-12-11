import React, { useState } from "react";

interface FilterButtonsProps {
  category: string;
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
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleButtonClick = () => {
    console.log("Button clicked for category:", category);
    setShowDropdown(!showDropdown);
    onButtonToggle(category);
  };

  const handleLocalDropdownSelect = (option: string) => {
    console.log("Dropdown item selected:", option);
    onDropdownSelect(category, option);
    setShowDropdown(false);
  };

  const renderDropdown = () => {
    return (
      <div className="dropdown">
        {options.map((option, index) => (
          <div
            key={index}
            className="dropdown-item"
            onClick={() => handleLocalDropdownSelect(option)}
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
        onClick={handleButtonClick}
      >
        {category}
        {options && <span className="dropdown-icon">&#9660;</span>}
      </button>
      {options && showDropdown && renderDropdown()}
    </div>
  );
};


export default FilterButtons;
