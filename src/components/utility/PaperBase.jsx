import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  paper: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius * 3,
  },
}));

const PaperBase = ({ children, className }) => {
  const cls = useStyles();

  return <div className={clsx(cls.paper, className)}>{children}</div>;
};

PaperBase.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default PaperBase;
