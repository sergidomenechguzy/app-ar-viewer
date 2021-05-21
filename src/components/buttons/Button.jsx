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
    border: '1px solid',
    borderColor: ({ color }) => {
      switch (color) {
        case 'default':
          return theme.palette.text.primary;
        default:
          return theme.palette[color].dark;
      }
    },
  },
  filled: {
    backgroundColor: theme.palette.grey[300],
  },
  color: {
    color: ({ color }) => {
      switch (color) {
        case 'default':
          return theme.palette.text.primary;
        default:
          return theme.palette[color].main;
      }
    },
  },
}));

const Button = ({ children, variant, color, className, ...rest }) => {
  const cls = useStyles({ color });
  return (
    <ButtonBase {...rest} className={clsx(cls.button, cls[variant], cls.color, className)}>
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

Button.defaultProps = {
  variant: 'default',
  color: 'default',
};

export default Button;
