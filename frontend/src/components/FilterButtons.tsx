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
    setShowDropdown(!showDropdown);
    onButtonToggle(category);
  };

  const handleDropdownSelect = (option: string) => {
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
            onClick={() => handleDropdownSelect(option)}
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
