import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import ButtonBase from './ButtonBase';

const useStyles = createUseStyles((theme) => ({
  button: {
    borderRadius: theme.shape.borderRadius * 3,
    color: theme.palette.text.primary,
    padding: theme.spacing(1.5),
    backgroundColor: `${theme.palette.background.default}00`,
  },
  outlined: {
    border: `1px solid ${theme.palette.text.primary}`,
  },
  filled: {
    backgroundColor: theme.palette.grey[300],
  },
  // color: {
  //   color: ({ color }) => {
  //     switch (color) {
  //       case 'default':
  //         return theme.palette.grey[300];
  //       default:
  //         return theme.palette[color].main;
  //     }
  //   },
  // },
}));

const Button = ({ children, variant, color, className, ...rest }) => {
  const cls = useStyles();
  return (
    <ButtonBase {...rest} className={clsx(cls.button, cls[variant], className)}>
      {children}
    </ButtonBase>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'outlined', 'filled']),
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success',
  ]),
  className: PropTypes.string,
};

export default Button;
