import React from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { useViewStore } from '../../stores/ViewStore';
import { useXRSession } from '../../stores/XRSessionStore';
import requestSession from '../../webxr/requestSession';
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

const WebXrSupportedModal = ({ open, onClose }) => {
  const cls = useStyles();
  const { t } = useTranslation();
  const { dispatch } = useViewStore();
  const { xrSession, clearSession } = useXRSession();

  const startAr = async () => {
    xrSession.current = await requestSession(clearSession);
    dispatch({ type: 'setAr' });
    onClose();
  };
  const start3d = () => {
    dispatch({ type: 'set3d' });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={startAr}
      header={<Typography variant="h5">{t('AR supported')}</Typography>}
      footer={
        <>
          <Button onClick={start3d}>{t('Switch to 3D-Viewer')}</Button>
          <Button onClick={startAr} className={cls.startAr}>
            {t('Start AR-Session')}
          </Button>
        </>
      }
      footerPositioning="end"
      className={cls.modal}
    >
      <Typography>
        {t(
          'Your device and browser support WebXR. That means you can place 3D-Objects around yourself using the camera.'
        )}
      </Typography>
    </Modal>
  );
};

export default WebXrSupportedModal;
