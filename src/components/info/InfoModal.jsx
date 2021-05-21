import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import Modal from '../utility/Modal';
import Typography from '../utility/Typography';
import InfoElement from './InfoElement';
import CheckCheckedIcon from '../icons/CheckCheckedIcon';
import UploadIcon from '../icons/UploadIcon';
import DownloadIcon from '../icons/DownloadIcon';
import DeleteIcon from '../icons/DeleteIcon';
import Button from '../buttons/Button';

const useStyles = createUseStyles((theme) => ({
  modal: {
    position: 'fixed',
    left: theme.spacing(1),
    top: theme.spacing(13),
    maxWidth: '85%',

    '&:before': {
      content: '""',
      position: 'absolute',
      transform: 'rotate(45deg)',
      width: theme.spacing(3),
      height: theme.spacing(3),
      left: theme.spacing(2.5),
      top: theme.spacing(-1),
      backgroundColor: theme.palette.background.paper,
    },
  },
  info: {
    marginBottom: theme.spacing(3),
  },
}));

const InfoModal = ({ open, onClose }) => {
  const cls = useStyles();
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={cls.modal}
      header={<Typography variant="h5">{t('Manage Your Assets')}</Typography>}
      footer={
        <Button onClick={onClose} ariaLabel={t('close info')}>
          {t('Got it!')}
        </Button>
      }
      hasTitle
      footerPositioning="end"
      zOffset={30}
    >
      <InfoElement
        info={t('Select the 3D-Object you want to place around yourself.')}
        icon={<CheckCheckedIcon />}
        className={cls.info}
      />
      <InfoElement
        info={t('Upload your own local .gltf / .glb 3D-Objects.')}
        icon={<UploadIcon />}
        className={cls.info}
      />
      <InfoElement
        info={t('Download 3D-Objects to keep using them offline.')}
        icon={<DownloadIcon />}
        className={cls.info}
      />
      <InfoElement
        info={t('Delete downloaded or locally uploaded 3D-Objects.')}
        icon={<DeleteIcon />}
      />
    </Modal>
  );
};

InfoModal.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
};

export default InfoModal;
