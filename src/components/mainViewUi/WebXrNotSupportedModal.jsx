import React from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { useViewStore } from '../../stores/ViewStore';
import Button from '../buttons/Button';
import Modal from '../utility/Modal';
import Typography from '../utility/Typography';

const useStyles = createUseStyles((theme) => ({
  modal: {
    width: '500px',
    maxWidth: '90%',
  },
}));

const WebXrNotSupportedModal = ({ open, onClose }) => {
  const cls = useStyles();
  const { t } = useTranslation();
  const { dispatch } = useViewStore();

  const start3d = () => {
    dispatch({ type: 'set3d' });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={start3d}
      header={<Typography variant="h5">{t('AR not supported')}</Typography>}
      footer={<Button onClick={start3d}>{t('Start 3D-Viewer')}</Button>}
      footerPositioning="end"
      className={cls.modal}
    >
      <Typography>
        {t(
          'It seems like your device or browser does not support WebXR. You can still view the 3D-Objects in the 3D-Object-Viewer.'
        )}
      </Typography>
    </Modal>
  );
};

WebXrNotSupportedModal.displayName = 'WebXrNotSupportedModal';

WebXrNotSupportedModal.propTypes = {};

WebXrNotSupportedModal.defaultProps = {};

export default WebXrNotSupportedModal;
