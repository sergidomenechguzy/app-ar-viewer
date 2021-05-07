import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import ManageObjectsFooter from './ManageObjectsFooter';
import ManageObjectsHeader from './ManageObjectsHeader';
import BottomSlidingModal from '../utility/BottomSlidingModal';
import ObjectList from './ObjectList';
import Typography from '../utility/Typography';
import { useConfigStore } from '../../stores/ConfigStore';
import OfflineAlert from './OfflineAlert';

const useStyles = createUseStyles((theme) => ({
  modal: {
    backgroundColor: theme.palette.background.default,
  },
  header: {
    marginLeft: theme.spacing(2),
  },
  test: {
    height: '2000px',
  },
}));

const ManageObjectsModal = ({ open, onClose }) => {
  const cls = useStyles();
  const { config } = useConfigStore();
  const { t } = useTranslation();

  return (
    <BottomSlidingModal
      open={open}
      onClose={onClose}
      className={cls.modal}
      header={<ManageObjectsHeader onClose={onClose} />}
      footer={<ManageObjectsFooter />}
      fullHeight
      fullSizeContent
      divideContent
    >
      <ObjectList
        files={[]}
        header={
          <Typography className={cls.header} variant="h5">
            {t('Uploaded')}
          </Typography>
        }
      />
      <ObjectList
        files={[]}
        header={
          <Typography className={cls.header} variant="h5">
            {t('Saved')}
          </Typography>
        }
      />
      <ObjectList
        files={config.files}
        header={
          <Typography className={cls.header} variant="h5">
            {t('3D-Objects')}
          </Typography>
        }
        alternative={<OfflineAlert />}
      />
    </BottomSlidingModal>
  );
};

ManageObjectsModal.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ManageObjectsModal;
