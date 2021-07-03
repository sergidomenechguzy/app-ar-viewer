import React, { createContext, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { useGltfStore } from './GltfStore';
import useResettableState from '../hooks/useResettableState';

const Context = createContext();

const SelectionStore = ({ children }) => {
  const value = useResettableState(null);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

SelectionStore.displayName = 'SelectionStore';

SelectionStore.propTypes = {
  children: PropTypes.node.isRequired,
};

SelectionStore.defaultProps = {};

export default SelectionStore;

export const useSelectionStore = () => {
  const [selected, setSelected, resetSelected] = useContext(Context);
  const { getGltf } = useGltfStore();

  const selectAndLoad = useCallback(
    async (id) => {
      const gltf = await getGltf(id);
      if (gltf) {
        setSelected(id);
      }
      return gltf;
    },
    [getGltf, setSelected]
  );

  return { selected, selectAndLoad, resetSelected };
};
