import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Spinner from '../icons/Spinner';
import Typography from './Typography';

const useStyles = createUseStyles((theme) => ({
  fallback: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: theme.palette.background.default,
  },
  typography: {
    marginTop: theme.spacing(1),
  },
}));

const LazyLoad = ({ children }) => {
  const cls = useStyles();
  return (
    <Suspense
      fallback={
        <span className={cls.fallback}>
          <Spinner variant="big" size="h2" />
          <Typography variant="h6" className={cls.typography}>
            Loading
          </Typography>
        </span>
      }
    >
      {children}
    </Suspense>
  );
};

LazyLoad.displayName = 'LazyLoad';

LazyLoad.propTypes = {
  children: PropTypes.node.isRequired,
};

LazyLoad.defaultProps = {};

export default LazyLoad;
