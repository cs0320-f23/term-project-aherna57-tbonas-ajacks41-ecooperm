import { useEffect } from "react";
import { useTimeout } from "./useTimeout";

/** The useDebounce hook is a custom hook designed to debounce a callback function. 
 * It utilizes the useTimeout hook, extracting the reset and clear functions. 
 * The useEffect hook is employed to reset the timeout whenever the specified dependencies (deps) change, 
 * and another useEffect hook ensures the timeout is cleared when the component unmounts. 
 * This hook is useful for delaying the execution of a callback function until a specified period of 
 * inactivity, often used in scenarios like handling user input. */

// Custom hook definition for debouncing a callback function
export const useDebounce = (callback, delay, deps) => {
  // Destructuring the reset and clear functions from the useTimeout hook
  const { reset, clear } = useTimeout(callback, delay);

  // Effect to reset the timeout when dependencies change
  useEffect(reset, [...deps, reset]);

  // Effect to clear the timeout when the component unmounts
  useEffect(clear, []);
};
