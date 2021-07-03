import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { useViewStore } from '../../stores/ViewStore';

const useStyles = createUseStyles((theme) => ({
  app: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: ({ currentView }) =>
      currentView === 'none' ? theme.palette.background.default : 'transparent',
  },
}));

const AppWrapper = ({ children }) => {
  const { currentView } = useViewStore();
  const cls = useStyles({ currentView });

  return <div className={cls.app}>{children}</div>;
};

AppWrapper.displayName = 'AppWrapper';

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

AppWrapper.defaultProps = {};

export default AppWrapper;
