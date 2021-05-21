import PropTypes from 'prop-types';
import React, { createContext, useCallback, useContext } from 'react';
import useResettableState from '../hooks/useResettableState';
import loadGltf from '../three/loadGltf';
import { useConfigStore } from './ConfigStore';
import { useSnackbarStore } from './SnackbarStore';
import { useUploadedFilesStore } from './UploadedFilesStore';

const Context = createContext();

const GltfStore = ({ children }) => {
  const value = useResettableState({});

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

GltfStore.propTypes = {
  children: PropTypes.node.isRequired,
};

GltfStore.displayName = 'GltfStore';

export default GltfStore;

export const useGltfStore = () => {
  const [gltfs, setGltfs, resetGltfs] = useContext(Context);
  const { config } = useConfigStore();
  const { showErrorMessage } = useSnackbarStore();
  const { files: uploadedFiles } = useUploadedFilesStore();

  const loadGltfToStore = useCallback(
    async (gltfConfig) => {
      try {
        const gltf = await loadGltf(gltfConfig.path, gltfConfig);

        setGltfs((old) => ({
          ...old,
          [gltfConfig.id]: gltf,
        }));
        return gltf;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('failed to load gltf', gltfConfig, err);
        showErrorMessage();
        return null;
      }
    },
    [showErrorMessage, setGltfs]
  );

  const getGltf = useCallback(
    async (gltfId) => {
      if (!(gltfId in gltfs)) {
        let gltfConfig = config.files.find((currGltfConfig) => currGltfConfig.id === gltfId);
        if (!gltfConfig) {
          gltfConfig = uploadedFiles.find((currGltfConfig) => currGltfConfig.id === gltfId);
        }
        const gltf = await loadGltfToStore(gltfConfig);
        return gltf;
      }
      return gltfs[gltfId];
    },
    [config.files, gltfs, loadGltfToStore, uploadedFiles]
  );

  const removeGltf = useCallback(
    (gltfId) => {
      if (gltfId in gltfs) {
        setGltfs((old) => {
          // eslint-disable-next-line no-param-reassign
          delete old[gltfId];
          return old;
        });
      }
    },
    [gltfs, setGltfs]
  );

  return {
    gltfs,
    getGltf,
    removeGltf,
    resetGltfs,
  };
};
