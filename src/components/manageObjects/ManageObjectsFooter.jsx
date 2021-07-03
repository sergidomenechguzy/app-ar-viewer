import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { useUploadedFilesStore } from '../../stores/UploadedFilesStore';
import Button from '../buttons/Button';
import Spinner from '../icons/Spinner';

const useStyles = createUseStyles((theme) => ({
  button: {
    width: theme.spacing(9),
    height: theme.spacing(3),
  },
}));

const ManageObjectsFooter = () => {
  const cls = useStyles();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { addFile } = useUploadedFilesStore();
  const [loading, setLoading] = useState(false);

  const onUpload = useCallback(
    async (event) => {
      try {
        setLoading(true);
        const file = event.target.files[0];
        await addFile(file);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
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
        disabled={loading}
      />
      {inputRef?.current && (
        <label htmlFor="fileUpload">
          <Button variant="outlined" component="span" disabled={loading} className={cls.button}>
            {loading ? <Spinner variant="big" size="h5" /> : t('Upload')}
          </Button>
        </label>
      )}
    </>
  );
};

ManageObjectsFooter.displayName = 'ManageObjectsFooter';

ManageObjectsFooter.propTypes = {};

ManageObjectsFooter.defaultProps = {};

export default ManageObjectsFooter;
