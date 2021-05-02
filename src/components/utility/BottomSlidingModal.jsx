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
    maxHeight: `calc(100% - ${theme.spacing(3)})`,
    marginTop: theme.spacing(3),
    borderTopLeftRadius: theme.shape.borderRadius * 10,
    borderTopRightRadius: theme.shape.borderRadius * 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
}));

const BottomSlidingModal = ({ children, className, fullHeight, ...rest }) => {
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

BottomSlidingModal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fullHeight: PropTypes.bool,
};

BottomSlidingModal.defaultProps = {
  fullHeight: false,
};

export default BottomSlidingModal;
