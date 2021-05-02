import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import Clickable from '../utility/Clickable';

const useStyles = createUseStyles((theme) => ({
  buttonBase: {
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const ButtonBase = ({ children, className, onClick, disableFocus, disableActive }) => {
  const cls = useStyles();
  return (
    <Clickable disableFocus={disableFocus} disableActive={disableActive}>
      <button className={clsx(cls.buttonBase, className)} onClick={onClick}>
        {children}
      </button>
    </Clickable>
  );
};

ButtonBase.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disableFocus: PropTypes.bool,
  disableActive: PropTypes.bool,
};

ButtonBase.defaultProps = {
  className: null,
  onClick: null,
  disableFocus: false,
  disableActive: false,
};

export default ButtonBase;
