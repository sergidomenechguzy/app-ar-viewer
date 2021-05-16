import React from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import Button from '../buttons/Button';
import Modal from '../utility/Modal';
import Typography from '../utility/Typography';

const useStyles = createUseStyles((theme) => ({
  modal: {
    width: '500px',
    maxWidth: '90%',
  },
  startAr: {
    marginLeft: theme.spacing(1),
  },
}));

const WebXrClosedModal = ({ open, onClose }) => {
  const cls = useStyles();
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onClose}
      header={<Typography variant="h5">{t('AR-Session stopped')}</Typography>}
      footer={<Button onClick={onClose}>{t('Got it!')}</Button>}
      footerPositioning="end"
      className={cls.modal}
    >
      <Typography>
        {t(
          'Something stopped the currently running AR-Session, so the viewer got switched to the 3D-Viewer as a fallback. You can just start it again by switching the view.'
        )}
      </Typography>
    </Modal>
  );
};

export default WebXrClosedModal;
