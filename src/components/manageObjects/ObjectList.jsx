import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import ObjectListElement from './ObjectListElement';
import { useSelectionStore } from '../../stores/SelectionStore';
import { useGltfStore } from '../../stores/GltfStore';

const useStyles = createUseStyles((theme) => ({
  listWrapper: {
    paddingTop: theme.spacing(3),
  },
  objectList: {
    padding: 0,
    marginTop: theme.spacing(1, 1),
  },
}));

const ObjectList = ({ files, onClick, onClose, header, action, actionIcon, alternative }) => {
  const cls = useStyles();
  const { selected, selectAndLoad, resetSelected } = useSelectionStore();
  const { getGltf, removeGltf } = useGltfStore();

  const handleSelect = useCallback(
    async (id) => {
      await selectAndLoad(id);
      if (onClick) {
        onClick();
      }
      if (onClose) {
        onClose();
      }
    },
    [onClick, onClose, selectAndLoad]
  );

  const handleDownload = useCallback(
    async ({ id }) => {
      await getGltf(id);
      if (onClick) {
        onClick();
      }
    },
    [getGltf, onClick]
  );

  const handleDelete = useCallback(
    async ({ id, path }) => {
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
    },
    [onClick, removeGltf, resetSelected, selected]
  );

  const actionFunctions = {
    download: handleDownload,
    delete: handleDelete,
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
  action: PropTypes.oneOf(['download', 'delete']),
  actionIcon: PropTypes.element,
  alternative: PropTypes.node,
};

export default ObjectList;
