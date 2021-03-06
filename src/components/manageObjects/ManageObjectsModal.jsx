import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import { Offline, Online } from 'react-detect-offline';
import ManageObjectsFooter from './ManageObjectsFooter';
import ManageObjectsHeader from './ManageObjectsHeader';
import SlidingModal from '../utility/SlidingModal';
import ObjectList from './ObjectList';
import Typography from '../utility/Typography';
import { useConfigStore } from '../../stores/ConfigStore';
import OfflineAlert from './OfflineAlert';
import DeleteIcon from '../icons/DeleteIcon';
import DownloadIcon from '../icons/DownloadIcon';
import { useSnackbarStore } from '../../stores/SnackbarStore';
import { useUploadedFilesStore } from '../../stores/UploadedFilesStore';

const useStyles = createUseStyles((theme) => ({
  modal: {
    backgroundColor: theme.palette.background.default,
  },
  header: {
    marginLeft: theme.spacing(2),
  },
}));

const ManageObjectsModal = ({ open, onClose }) => {
  const cls = useStyles();
  const { config } = useConfigStore();
  const { files } = useUploadedFilesStore();
  const { t } = useTranslation();
  const [downloadableFiles, setDownloadableFiles] = useState([]);
  const [cachedFiles, setCachedFiles] = useState([]);
  const { addSnackbarMessage } = useSnackbarStore();

  const getCachedFiles = useCallback(async () => {
    try {
      const cache = await caches.open('assets');
      const promises = config.files.map(async (file) => {
        const request = new Request(`${window.location.origin}/${file.path}`);
        const match = await cache.match(request);
        return match;
      });
      const cached = [];
      const notCached = [];
      (await Promise.all(promises)).forEach((match, index) => {
        if (match !== undefined) {
          cached.push(config.files[index]);
        } else {
          notCached.push(config.files[index]);
        }
      });
      setCachedFiles(cached);
      setDownloadableFiles(notCached);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('something went wrong while accessing the cache', err);
      addSnackbarMessage('Something went wrong while accessing the cache!', 'error');
      setDownloadableFiles(config.files);
    }
  }, [addSnackbarMessage, config.files]);

  useEffect(() => {
    if (open) {
      getCachedFiles();
    }
  }, [getCachedFiles, open]);

  return (
    <SlidingModal
      open={open}
      onClose={onClose}
      className={cls.modal}
      header={<ManageObjectsHeader onClose={onClose} />}
      footer={<ManageObjectsFooter />}
      fullHeight
      fullSizeContent
      divideContent
      zOffset={20}
    >
      <ObjectList
        files={files}
        onClick={getCachedFiles}
        onClose={onClose}
        header={
          <Typography className={cls.header} variant="h5">
            {t('Uploaded')}
          </Typography>
        }
        action="deleteLocal"
        actionIcon={<DeleteIcon size="h6" />}
        confirmAction={true}
        translateName={false}
      />
      <ObjectList
        files={cachedFiles}
        onClick={getCachedFiles}
        onClose={onClose}
        header={
          <Typography className={cls.header} variant="h5">
            {t('Downloaded')}
          </Typography>
        }
        action="delete"
        actionIcon={<DeleteIcon size="h6" />}
        confirmAction={true}
      />
      <Online polling={{ enabled: false }}>
        <ObjectList
          files={downloadableFiles}
          onClick={getCachedFiles}
          onClose={onClose}
          header={
            <Typography className={cls.header} variant="h5">
              {t('3D-Objects')}
            </Typography>
          }
          action="download"
          actionIcon={<DownloadIcon size="h6" />}
        />
      </Online>
      <Offline polling={{ enabled: false }}>
        <ObjectList
          files={[]}
          onClick={getCachedFiles}
          onClose={onClose}
          header={
            <Typography className={cls.header} variant="h5">
              {t('3D-Objects')}
            </Typography>
          }
          action="download"
          actionIcon={<DownloadIcon size="h6" />}
          alternative={<OfflineAlert />}
        />
      </Offline>
    </SlidingModal>
  );
};

ManageObjectsModal.displayName = 'ManageObjectsModal';

ManageObjectsModal.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
};

ManageObjectsModal.defaultProps = {};

export default ManageObjectsModal;
