import React, { createContext, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import useResettableState from '../hooks/useResettableState';
import { checkFileType } from '../utils';
import { useSnackbarStore } from './SnackbarStore';

const Context = createContext();

const UploadedFilesStore = ({ children }) => {
  const value = useResettableState([]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

UploadedFilesStore.propTypes = {
  children: PropTypes.node.isRequired,
};

UploadedFilesStore.displayName = 'UploadedFilesStore';

export default UploadedFilesStore;

export const useUploadedFilesStore = () => {
  const [files, setFiles, resetFiles] = useContext(Context);
  const { addSnackbarMessage } = useSnackbarStore();

  const addFile = useCallback(
    async (file) => {
      try {
        const supportedType = await checkFileType(file);
        const path = URL.createObjectURL(file);

        if (!supportedType) {
          addSnackbarMessage('File type not supported, only .gltf / .glb files allowed!', 'error');
          return;
        }

        setFiles((old) => [
          ...old,
          {
            id: nanoid(),
            name: file.name,
            size: file.size,
            category: 'Local 3D-Object',
            file,
            path,
          },
        ]);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('something went wrong while processing uploaded file', err);
        addSnackbarMessage(
          'Something went wrong while processing the uploaded file, please try again!',
          'error'
        );
      }
    },
    [addSnackbarMessage, setFiles]
  );

  const removeFile = useCallback(
    (fileId) => {
      setFiles((old) => {
        const index = old.findIndex((file) => file.id === fileId);
        if (index !== -1) {
          old.splice(index, 1);
        }
        return old;
      });
    },
    [setFiles]
  );

  return {
    files,
    addFile,
    removeFile,
    resetFiles,
  };
};
