import { useCallback, useState } from 'react';

const useOpenState = (initial) => {
  const [value, set] = useState(initial);

  const setTrue = useCallback(() => {
    set(true);
  }, []);
  const setFalse = useCallback(() => {
    set(false);
  }, []);
  const toggle = useCallback(() => {
    set((old) => !old);
  }, []);

  return [value, setTrue, setFalse, toggle];
};

export default useOpenState;
