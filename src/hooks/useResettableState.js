import { useCallback, useState } from 'react';

const useResettableState = (initial) => {
  const [value, set] = useState(initial);

  const reset = useCallback(() => {
    set(initial);
  }, [initial]);

  return [value, set, reset];
};

export default useResettableState;
