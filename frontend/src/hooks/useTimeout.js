import { useCallback, useEffect, useRef } from "react";

/** The useTimeout hook is a custom hook designed to manage timeouts in React. It utilizes useRef to store the 
 * latest callback function and the timeout reference. The useEffect hook is employed to update the callbackRef 
 * when the callback changes, set the initial timeout and clear it on unmount. useCallback is used to memoize the 
 * set, clear, and reset functions, providing efficient re-rendering. The hook is useful for scenarios where delayed 
 * execution of a function is required, such as handling timeouts in components. */

// Custom hook definition for handling timeouts
export const useTimeout = (callback, delay) => {
  // useRef to hold the latest callback function
  const callbackRef = useRef(callback);
  // useRef to hold the timeout reference
  const timeoutRef = useRef();

  // Effect to update the callbackRef when the callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // useCallback for the set function to memoize it
  const set = useCallback(() => {
    // Set a timeout to execute the callback after the specified delay
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  // useCallback for the clear function to memoize it
  const clear = useCallback(() => {
    // Clear the timeout if it exists
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  // Effect to set the timeout on initial render and clear it on unmount
  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  // useCallback for the reset function to memoize it
  const reset = useCallback(() => {
    // Clear existing timeout and set a new one
    clear();
    set();
  }, [clear, set]);

  // Return an object with reset and clear functions
  return { reset, clear };
};
