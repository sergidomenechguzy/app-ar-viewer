import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import ObjectListElement from './ObjectListElement';
import { useSelectionStore } from '../../stores/SelectionStore';

const useStyles = createUseStyles((theme) => ({
  listWrapper: {
    paddingTop: theme.spacing(3),
  },
  objectList: {
    padding: 0,
    marginTop: theme.spacing(1, 1),
  },
}));

const ObjectList = ({ files, header, alternative }) => {
  const cls = useStyles();
  const { selected, selectAndLoad } = useSelectionStore();

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
              onClick={() => selectAndLoad(file.id)}
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
  header: PropTypes.element,
  alternative: PropTypes.node,
};

export default ObjectList;
