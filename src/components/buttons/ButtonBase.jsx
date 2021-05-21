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
    ...theme.typography.button,
  },
}));

const ButtonBase = ({
  children,
  className,
  onClick,
  disableFocus,
  disableActive,
  component,
  ariaLabel,
}) => {
  const cls = useStyles();
  return (
    <Clickable disableFocus={disableFocus} disableActive={disableActive}>
      {component === 'span' ? (
        <span className={clsx(cls.buttonBase, className)} onClick={onClick}>
          {children}
        </span>
      ) : (
        <button
          className={clsx(cls.buttonBase, className)}
          onClick={onClick}
          aria-label={typeof children === 'string' ? children : ariaLabel}
        >
          {children}
        </button>
      )}
    </Clickable>
  );
};

ButtonBase.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disableFocus: PropTypes.bool,
  disableActive: PropTypes.bool,
  component: PropTypes.oneOf(['button', 'span']),
  ariaLabel: PropTypes.string,
};

ButtonBase.defaultProps = {
  className: null,
  onClick: null,
  disableFocus: false,
  disableActive: false,
  component: 'button',
};

export default ButtonBase;
