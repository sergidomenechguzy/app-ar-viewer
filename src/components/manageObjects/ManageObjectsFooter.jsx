import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
// import { createUseStyles } from 'react-jss';
import { useUploadedFilesStore } from '../../stores/UploadedFilesStore';
import Button from '../buttons/Button';

// const useStyles = createUseStyles((theme) => ({
//   button: {
//     margin: theme.spacing(2),
//   },
// }));

const ManageObjectsFooter = () => {
  // const cls = useStyles();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { addFile } = useUploadedFilesStore();

  const onUpload = useCallback(
    (event) => {
      const file = event.target.files[0];
      addFile(file);
    },
    [addFile]
  );

  return (
    <>
      <input
        id="fileUpload"
        ref={inputRef}
        type="file"
        accept=".gltf, .glb"
        style={{ display: 'none' }}
        onChange={onUpload}
        aria-label={t('Upload')}
      />
      {inputRef?.current && (
        <label htmlFor="fileUpload">
          <Button variant="outlined" component="span">
            {t('Upload')}
          </Button>
        </label>
      )}
    </>
  );
};

export default ManageObjectsFooter;
