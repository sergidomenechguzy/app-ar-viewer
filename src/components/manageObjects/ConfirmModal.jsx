import React from 'react';
import { Offline } from 'react-detect-offline';
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
  confirm: {
    marginLeft: theme.spacing(1),
  },
  offline: {
    marginTop: theme.spacing(1),
  },
}));

const ConfirmModal = ({ open, onClose, onConfirm }) => {
  const cls = useStyles();
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onClose}
      header={<Typography variant="h5">{t('Are you sure?')}</Typography>}
      footer={
        <>
          <Button onClick={onClose}>{t('Cancel')}</Button>
          <Button onClick={onConfirm} className={cls.confirm}>
            {t('Delete')}
          </Button>
        </>
      }
      footerPositioning="end"
      className={cls.modal}
      zOffset={30}
    >
      <Typography>
        {t(
          'Deleting the 3D-Object will remove it from the local cache and it has to be downloaded again.'
        )}
      </Typography>
      <Offline polling={{ enabled: false }}>
        <Typography className={cls.offline}>
          {t('You will not be able to select this 3D-Object again until you go online.')}
        </Typography>
      </Offline>
    </Modal>
  );
};

export default ConfirmModal;
