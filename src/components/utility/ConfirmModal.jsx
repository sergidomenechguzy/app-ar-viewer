import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import Button from '../buttons/Button';
import Modal from './Modal';
import Typography from './Typography';

const useStyles = createUseStyles((theme) => ({
  modal: {
    width: '500px',
    maxWidth: '90%',
  },
  confirm: {
    marginLeft: theme.spacing(1),
  },
}));

const ConfirmModal = ({ children, open, onClose, onConfirm }) => {
  const cls = useStyles();
  const { t } = useTranslation();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      header={<Typography variant="h5">{t('Are you sure?')}</Typography>}
      footer={
        <>
          <Button onClick={onClose}>{t('Cancel')}</Button>
          <Button color="error" onClick={handleConfirm} className={cls.confirm}>
            {t('Delete')}
          </Button>
        </>
      }
      footerPositioning="end"
      className={cls.modal}
      zOffset={30}
    >
      {children}
    </Modal>
  );
};

ConfirmModal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmModal;
