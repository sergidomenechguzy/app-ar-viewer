import { useState } from 'react';

const useOpenState = (initial) => {
  const [value, set] = useState(initial);

  const setTrue = () => {
    set(true);
  };
  const setFalse = () => {
    set(false);
  };
  const toggle = () => {
    set((old) => !old);
  };

  return [value, setTrue, setFalse, toggle];
};

export default useOpenState;
