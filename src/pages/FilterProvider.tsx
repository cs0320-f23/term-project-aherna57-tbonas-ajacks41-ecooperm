import { createContext, useState } from "react";

interface FilterContextValue {
  selectedOptions: { [key: string]: string };
  setSelectedOptions: (options: { [key: string]: string }) => void;
}

const FilterContext = createContext<FilterContextValue>({
  selectedOptions: {},
  setSelectedOptions: () => {},
});

const FilterProvider = ({ children }: any) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  return (
    <FilterContext.Provider value={{ selectedOptions, setSelectedOptions }}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext }; 
export default FilterProvider; 
