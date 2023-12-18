import React, { useState, useEffect } from "react";
import styles from "../styles/filterbuttons.module.css";

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
  selectedOption: string | null;
  setSelectedOption: (option: string | null) => void;
}

// Interface to represent the selected filter options
interface SelectedOptions {
  [key: string]: string;
}

// Functional component definition for the FilterButtons
const FilterButtons: React.FC<FilterButtonsProps> = ({
  category,
  options,
  activeCategory,
  setActiveCategory,
  resetKey,
  selectedOption,
  setSelectedOption,
}) => {
  // State variables for managing dropdown visibility and selected option
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

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

  // Function to handle button toggle and filter selection
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

  // Effect to reset the component state when the resetKey changes
  useEffect(() => {
    setActiveCategory(null);
    setShowDropdown(false);
    setSelectedOption(null);
  }, [resetKey]);

  // Function to render the dropdown options
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

  // JSX structure for the FilterButtons component
  return (
    <div className={styles.buttonContainer}>
      <button
        className={` ${styles.toggleButton} ${
          selectedOption ? `${styles.selected}` : ""
        } ${activeCategory === category ? `${styles.active}` : ""}`}
        onClick={handleButtonToggle}
      >
        {selectedOption || category}
        {options && <span className={styles.dropdownIcon}>&#9660;</span>}
      </button>
      {activeCategory === category && renderDropdown()}
    </div>
  );
};

// Exporting the FilterButtons component as the default export
export default FilterButtons;
