import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import ButtonBase from './ButtonBase';

const useStyles = createUseStyles((theme) => ({
  iconButton: {
    padding: theme.spacing(1),
    borderRadius: '50%',
    backgroundColor: `${theme.palette.background.default}00`,
  },
}));

const IconButton = ({ children, className, ...rest }) => {
  const cls = useStyles();

  return (
    <ButtonBase className={clsx(cls.iconButton, className)} {...rest}>
      {children}
    </ButtonBase>
  );
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default IconButton;
