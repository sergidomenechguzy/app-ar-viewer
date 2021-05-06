import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  app: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
}));

const AppWrapper = ({ children }) => {
  const cls = useStyles();
  return <div className={cls.app}>{children}</div>;
};

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppWrapper;
