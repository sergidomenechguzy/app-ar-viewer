import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import Modal from './Modal';

const useStyles = createUseStyles((theme) => ({
  paper: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: ({ fullHeight }) => (fullHeight ? '100%' : 'initial'),

    [theme.breakpoints.down('sm')]: {
      maxHeight: `calc(100% - ${theme.spacing(3)})`,
      marginTop: theme.spacing(3),
      borderTopLeftRadius: theme.shape.borderRadius * 10,
      borderTopRightRadius: theme.shape.borderRadius * 10,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },

    [theme.breakpoints.up('md')]: {
      right: 0,
      width: '450px',
      maxHeight: '100%',
      marginTop: 0,
      borderTopLeftRadius: theme.shape.borderRadius * 6,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: theme.shape.borderRadius * 6,
      borderBottomRightRadius: 0,
    },
  },
}));

const SlidingModal = ({ children, className, fullHeight, ...rest }) => {
  const cls = useStyles({ fullHeight });

  return (
    <Modal
      duration={250}
      variant="slide"
      className={clsx(cls.paper, className)}
      fullHeight={fullHeight}
      {...rest}
    >
      {children}
    </Modal>
  );
};

SlidingModal.displayName = 'SlidingModal';

SlidingModal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fullHeight: PropTypes.bool,
};

SlidingModal.defaultProps = {
  fullHeight: false,
};

export default SlidingModal;
