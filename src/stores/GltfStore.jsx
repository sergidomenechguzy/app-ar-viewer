import PropTypes from 'prop-types';
import React, { createContext, useCallback, useContext, useState } from 'react';
import loadGltf from '../three/loadGltf';
import { useConfigStore } from './ConfigStore';

const Context = createContext();

const GltfStore = ({ children, config }) => {
  const [gltfs, setGltfs] = useState({});

  return <Context.Provider value={{ gltfs, setGltfs }}>{children}</Context.Provider>;
};

GltfStore.propTypes = {
  children: PropTypes.node.isRequired,
  config: PropTypes.arrayOf(PropTypes.object),
};

GltfStore.defaultProps = {
  config: [],
};

GltfStore.displayName = 'GltfStore';

export default GltfStore;

export const useGltfStore = () => {
  const { gltfs: gltfsState, setGltfs } = useContext(Context);
  const { config } = useConfigStore();

  const loadGltfToStore = useCallback(
    async (gltfConfig) => {
      const gltf = await loadGltf(gltfConfig.path, gltfConfig);

      setGltfs((old) => ({
        ...old,
        [gltfConfig.id]: gltf,
      }));
      return gltf;
    },
    [setGltfs]
  );

  const getGltf = useCallback(
    async (gltfId) => {
      if (!(gltfId in gltfsState)) {
        const gltfConfig = config.files.find((currGltfConfig) => currGltfConfig.id === gltfId);
        const gltf = await loadGltfToStore(gltfConfig);
        return gltf;
      }
      return gltfsState[gltfId];
    },
    [config.files, gltfsState, loadGltfToStore]
  );

  return {
    gltfs: gltfsState,
    getGltf,
  };
};
