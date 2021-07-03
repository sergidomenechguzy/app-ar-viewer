import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { useSnackbarStore } from '../../stores/SnackbarStore';
import { useViewStore } from '../../stores/ViewStore';
import { useXrSession } from '../../stores/XrSessionStore';
import requestSession from '../../three/requestSession';
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
  const { xrSession, clearSession } = useXrSession();
  const { addSnackbarMessage } = useSnackbarStore();

  const startAr = useCallback(async () => {
    try {
      xrSession.current = await requestSession(clearSession);
      dispatch({ type: 'setAr' });
      onClose();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('something went wrong while starting the ar session', err);
      dispatch({ type: 'set3d' });
      addSnackbarMessage('Something went wrong while starting the AR session!', 'error');
      onClose();
    }
  }, [addSnackbarMessage, clearSession, dispatch, onClose, xrSession]);

  const start3d = useCallback(() => {
    dispatch({ type: 'set3d' });
    onClose();
  }, [dispatch, onClose]);

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

WebXrSupportedModal.displayName = 'WebXrSupportedModal';

WebXrSupportedModal.propTypes = {};

WebXrSupportedModal.defaultProps = {};

export default WebXrSupportedModal;
