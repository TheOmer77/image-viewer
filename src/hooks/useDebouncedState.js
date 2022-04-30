import { useState, useEffect } from 'react';

/**
 * Returns a stateful value, a debounced version of it that only updates after
 * `debounceTime`ms, and a function to update the state.
 * @template T
 * @param {T} initialState
 * @param {number} debounceTime
 * @returns {[T, T, React.Dispatch<T>]}
 */
const useDebouncedState = (initialState, debounceTime = 1000) => {
  const [state, setState] = useState(initialState),
    [debouncedState, setDebouncedState] = useState(state);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedState(state), debounceTime);

    return () => clearTimeout(timer);
  }, [state, debounceTime]);

  return [state, debouncedState, setState];
};

export default useDebouncedState;
