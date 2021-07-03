import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import ButtonBase from './ButtonBase';

const useStyles = createUseStyles((theme) => ({
  button: {
    borderRadius: theme.shape.borderRadius * 6,
    backgroundColor: `${theme.palette.background.float}ee`,
    color: theme.palette.text.primary,
    padding: theme.spacing(1.5, 2.5),
    boxShadow: theme.shadows[1],
  },
}));

const FloatingButton = ({ children, className, ...rest }) => {
  const cls = useStyles();
  return (
    <ButtonBase {...rest} className={clsx(cls.button, className)}>
      {children}
    </ButtonBase>
  );
};

FloatingButton.displayName = 'FloatingButton';

FloatingButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

FloatingButton.defaultProps = {};

export default FloatingButton;
