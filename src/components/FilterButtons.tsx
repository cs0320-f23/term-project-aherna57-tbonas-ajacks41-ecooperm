import React, { useState, useEffect } from "react";
import styles from "../styles/filterbuttons.module.css";

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
      <div className={styles.dropdown}>
        {options.map((option, index) => (
          <div
            key={index}
            //const videoClassName = isFadingOut ? `${styles.video} ${styles.fadeOut}` : `${styles.video} ${styles.fadeIn}`;
            className={`${styles.dropdownItem} ${
              selectedOption === option ? `${styles.selected}` : ""
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
    <div className={styles.buttonContainer}>
      <button
        className={` ${styles.toggleButton} ${selectedOption ? `${styles.selected}` : ""} ${
          activeCategory === category ? `${styles.active}` : ""
        }`}
        onClick={handleButtonToggle}
      >
        {selectedOption || category}
        {options && <span className={styles.dropdownIcon}>&#9660;</span>}
      </button>
      {activeCategory === category && renderDropdown()}
    </div>
  );
};

export default FilterButtons;
