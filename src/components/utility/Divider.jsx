import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  divider: {
    backgroundColor: theme.palette.divider,
    border: 'none',
    height: '1px',
    margin: 0,
  },
}));

const Divider = ({ className }) => {
  const cls = useStyles();

  return <hr className={clsx(cls.divider, className)} />;
};

Divider.displayName = 'Divider';

Divider.propTypes = {
  className: PropTypes.string,
};

Divider.defaultProps = {};

export default Divider;
