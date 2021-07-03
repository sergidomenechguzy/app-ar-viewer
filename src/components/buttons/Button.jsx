import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import ButtonBase from './ButtonBase';
import { useThemestore } from '../../stores/ThemeStore';

const useStyles = createUseStyles((theme) => ({
  button: {
    borderRadius: theme.shape.borderRadius * 3,
    padding: theme.spacing(1.5),
    backgroundColor: `${theme.palette.background.default}00`,
  },
  outlined: {
    border: '1px solid',
    borderColor: ({ color, disabled, darkMode }) => {
      switch (color) {
        case 'default':
          return disabled ? theme.palette.text.disabled : theme.palette.text.primary;
        default:
          return disabled
            ? theme.palette[color][darkMode ? 'dark' : 'light']
            : theme.palette[color].main;
      }
    },
  },
  filled: {
    backgroundColor: ({ color, disabled }) => {
      switch (color) {
        case 'default':
          return disabled ? theme.palette.background.level5 : theme.palette.background.level4;
        default:
          return disabled ? theme.palette[color].dark : theme.palette[color].main;
      }
    },
  },
  color: {
    color: ({ color, disabled, variant, darkMode }) => {
      if (variant === 'filled' && color !== 'default') {
        return disabled ? theme.palette.grey[400] : theme.palette.common.white;
      }
      switch (color) {
        case 'default':
          return disabled ? theme.palette.text.disabled : theme.palette.text.primary;
        default:
          return disabled
            ? theme.palette[color][darkMode ? 'dark' : 'light']
            : theme.palette[color].main;
      }
    },
  },
}));

const Button = ({ children, variant, color, disabled, className, ...rest }) => {
  const { darkMode } = useThemestore();
  const cls = useStyles({ color, disabled, variant, darkMode });
  return (
    <ButtonBase
      disabled={disabled}
      {...rest}
      className={clsx(cls.button, cls[variant], cls.color, className)}
    >
      {children}
    </ButtonBase>
  );
};

Button.displayName = 'Button';

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
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  variant: 'default',
  color: 'default',
  disabled: false,
};

export default Button;
