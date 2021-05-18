import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import Clickable from './Clickable';

const useStyles = createUseStyles((theme) => ({
  switch: {
    position: 'relative',
  },
  htmlInput: {
    display: 'none',
  },
  slider: {
    cursor: 'pointer',
    height: ({ size }) => theme.typography[size].fontSize,
    width: ({ size }) => `calc(${theme.typography[size].fontSize} * 1.75)`,
    borderRadius: ({ size }) => theme.typography[size].fontSize,
    border: '1px solid',
    boxSizing: 'border-box',
    borderColor: theme.palette.action.active,
    backgroundColor: theme.palette.background.level3,
    display: 'flex',
    alignItems: 'center',

    '&:before': {
      content: '""',
      display: 'inline-block',
      height: ({ size }) => `calc(${theme.typography[size].fontSize} - 4px)`,
      width: ({ size }) => `calc(${theme.typography[size].fontSize} - 4px)`,
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[1],
      borderRadius: '50%',
      transition: '200ms ease',
      transitionProperty: 'transform, left',
      position: 'absolute',
      left: '1px',
      transform: 'translateX(0)',
    },
  },
  toggledOn: {
    backgroundColor: ({ color }) =>
      color === 'text' ? theme.palette.text.primary : theme.palette[color].main,
    borderColor: '#00000000',

    '&:before': {
      left: 'calc(100% - 1px)',
      transform: 'translateX(-100%)',
    },
  },
  disabled: {
    backgroundColor: theme.palette.background.level4,
    '&:before': {
      backgroundColor: theme.palette.background.level5,
    },
  },
}));

const Switch = ({ value, setValue, color, size, disabled }) => {
  const cls = useStyles({ size, color });

  const toggleValue = useCallback(() => {
    setValue(!value);
  }, [setValue, value]);

  return (
    <label className={cls.switch}>
      <input
        type="checkbox"
        checked={value}
        onChange={toggleValue}
        className={cls.htmlInput}
        disabled={disabled}
      />
      <Clickable disabled={disabled}>
        <div className={clsx(cls.slider, value && cls.toggledOn, disabled && cls.disabled)} />
      </Clickable>
    </label>
  );
};

Switch.propTypes = {
  value: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
  color: PropTypes.oneOf(['text', 'primary', 'secondary', 'error', 'warning', 'info', 'success']),
  size: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
  ]),
  disabled: PropTypes.bool,
};

Switch.defaultProps = {
  color: 'primary',
  size: 'body1',
  disabled: false,
};

export default Switch;
