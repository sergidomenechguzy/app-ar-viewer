import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { Transition } from 'react-transition-group';
import PaperBase from './PaperBase';
import Typography from './Typography';
import IconButton from '../buttons/IconButton';
import CloseIcon from '../icons/CloseIcon';

const useStyles = createUseStyles((theme) => ({
  snackbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 2, 1, 3),
    maxWidth: '90%',
    width: '350px',
    zIndex: theme.zIndex.snackbar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    transition: ({ duration }) => `transform ${duration}ms ease-in-out`,
    transform: 'translate3d(0, -100%, 0)',

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: theme.spacing(1),
      backgroundColor: ({ variant }) => theme.palette[variant].main,
    },
  },
  entered: {
    transform: 'translate3d(0, 0, 0)',
  },
  exiting: {
    transform: 'translate3d(0, -100%, 0)',
  },
  message: {
    width: '90%',
  },
}));

const Snackbar = ({ open, onClose, message, duration, variant }) => {
  const cls = useStyles({ duration, variant });
  const { t } = useTranslation();

  useEffect(() => {
    const id = setTimeout(() => {
      if (open && !!message) {
        onClose();
      }
    }, 3000);
    return () => clearTimeout(id);
  }, [message, onClose, open]);

  return (
    <Transition in={open} appear={true} timeout={open ? 0 : duration} mountOnEnter unmountOnExit>
      {(state) => (
        <PaperBase className={clsx(cls.snackbar, cls[state])}>
          <Typography className={cls.message}>{t(message)}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </PaperBase>
      )}
    </Transition>
  );
};

Snackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  duration: PropTypes.number,
  variant: PropTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'info', 'success']),
};

Snackbar.defaultProps = {
  message: '',
  duration: 100,
  variant: 'primary',
};

export default Snackbar;
