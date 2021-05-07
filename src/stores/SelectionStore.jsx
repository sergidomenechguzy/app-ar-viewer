import React, { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useGltfStore } from './GltfStore';

const Context = createContext();

const SelectionStore = ({ children }) => {
  const [selected, setSelected] = useState(null);

  return <Context.Provider value={{ selected, setSelected }}>{children}</Context.Provider>;
};

SelectionStore.propTypes = {
  children: PropTypes.node.isRequired,
};

Context.displayName = 'SelectionStore';

export default SelectionStore;

export const useSelectionStore = () => {
  const { selected, setSelected } = useContext(Context);
  const { getGltf } = useGltfStore();

  const selectAndLoad = useCallback(
    async (id) => {
      await getGltf(id);
      setSelected(id);
    },
    [getGltf, setSelected]
  );

  return { selected, selectAndLoad };
};
