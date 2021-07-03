import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import PaperBase from './PaperBase';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2),
    width: '100%',
    height: 'inherit',
  },
}));

const Paper = ({ children, className }) => {
  const cls = useStyles();

  return (
    <PaperBase className={className}>
      <div className={cls.wrapper}>{children}</div>
    </PaperBase>
  );
};

Paper.displayName = 'Paper';

Paper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Paper.defaultProps = {};

export default Paper;
