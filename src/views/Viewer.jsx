import React, { lazy } from 'react';
import { Loader } from '@react-three/drei';
import { useTheme } from 'react-jss';
import { useViewStore } from '../stores/ViewStore';
import LazyLoad from '../components/utility/LazyLoad';

const ArView = lazy(() => import('./ArView'));
const ObjectView = lazy(() => import('./ObjectView'));

const Viewer = () => {
  const { currentView } = useViewStore();
  const theme = useTheme();

  const viewComponent = currentView === 'ar' ? <ArView /> : <ObjectView />;

  return currentView !== 'none' ? (
    <>
      <LazyLoad>{viewComponent}</LazyLoad>
      <Loader
        containerStyles={{
          backgroundColor: `${theme.palette.common.black}aa`,
          zIndex: theme.zIndex.snackbar - 10,
        }}
        innerStyles={{
          backgroundColor: theme.palette.common.white,
          width: '150px',
          height: '10px',
        }}
        barStyles={{
          backgroundColor: theme.palette.primary.main,
          height: '10px',
        }}
        dataStyles={{
          color: theme.palette.common.white,
          ...theme.typography.body1,
        }}
      />
    </>
  ) : null;
};

Viewer.displayName = 'Viewer';

Viewer.propTypes = {};

Viewer.defaultProps = {};

export default Viewer;
