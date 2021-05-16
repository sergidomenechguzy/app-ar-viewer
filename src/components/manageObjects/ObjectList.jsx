import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import ObjectListElement from './ObjectListElement';
import { useSelectionStore } from '../../stores/SelectionStore';
import { useGltfStore } from '../../stores/GltfStore';
import { useSnackbarStore } from '../../stores/SnackbarStore';
import { useUploadedFilesStore } from '../../stores/UploadedFilesStore';

const useStyles = createUseStyles((theme) => ({
  listWrapper: {
    paddingTop: theme.spacing(3),
  },
  objectList: {
    padding: 0,
    marginTop: theme.spacing(1, 1),
  },
}));

const ObjectList = ({
  files,
  onClick,
  onClose,
  header,
  action,
  actionIcon,
  confirmAction,
  alternative,
}) => {
  const cls = useStyles();
  const { selected, selectAndLoad, resetSelected } = useSelectionStore();
  const { getGltf, removeGltf } = useGltfStore();
  const { removeFile } = useUploadedFilesStore();
  const { addSnackbarMessage } = useSnackbarStore();

  const handleSelect = useCallback(
    async (id) => {
      const gltf = await selectAndLoad(id);
      if (gltf) {
        if (onClick) {
          onClick();
        }
        if (onClose) {
          onClose();
        }
      }
    },
    [onClick, onClose, selectAndLoad]
  );

  const handleDownload = useCallback(
    async ({ id }) => {
      const gltf = await getGltf(id);
      if (gltf && onClick) {
        onClick();
      }
    },
    [getGltf, onClick]
  );

  const handleDelete = useCallback(
    async ({ id, path }) => {
      try {
        const cache = await caches.open('assets');
        const request = new Request(`${window.location.origin}/${path}`);
        await cache.delete(request);
        if (selected === id) {
          resetSelected();
        }
        removeGltf(id);
        if (onClick) {
          onClick();
        }
      } catch (err) {
        console.warn('something went wrong while accessing the cache', err);
        addSnackbarMessage('Something went wrong while accessing the cache!', 'error');
      }
    },
    [addSnackbarMessage, onClick, removeGltf, resetSelected, selected]
  );

  const handleDeleteLocal = useCallback(
    async ({ id }) => {
      if (selected === id) {
        resetSelected();
      }
      removeGltf(id);
      removeFile(id);
      if (onClick) {
        onClick();
      }
    },
    [onClick, removeFile, removeGltf, resetSelected, selected]
  );

  const actionFunctions = {
    download: handleDownload,
    delete: handleDelete,
    deleteLocal: handleDeleteLocal,
  };
  const confirmText = {
    download: null,
    delete:
      'Deleting the 3D-Object will remove it from the local cache and it has to be downloaded again.',
    deleteLocal:
      'Deleting the 3D-Object will remove all loaded data and it has to be uploaded again.',
  };
  const confirmTextOffline = {
    download: null,
    delete: 'You will not be able to select this 3D-Object again until you go online.',
    deleteLocal: null,
  };

  return files.length === 0 && !alternative ? null : (
    <div className={cls.listWrapper}>
      {header || null}
      {files.length > 0 ? (
        <ul className={cls.objectList}>
          {files.map((file, index) => (
            <ObjectListElement
              key={file.name}
              file={file}
              last={index === files.length - 1}
              selected={selected === file.id}
              onClick={handleSelect}
              onAction={actionFunctions[action]}
              actionIcon={actionIcon}
              confirmAction={confirmAction}
              confirmText={confirmText[action]}
              confirmTextOffline={confirmTextOffline[action]}
            />
          ))}
        </ul>
      ) : (
        alternative
      )}
    </div>
  );
};

ObjectList.propTypes = {
  files: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  header: PropTypes.element,
  action: PropTypes.oneOf(['download', 'delete', 'deleteLocal']),
  actionIcon: PropTypes.element,
  confirmAction: PropTypes.bool,
  alternative: PropTypes.node,
};

export default ObjectList;
