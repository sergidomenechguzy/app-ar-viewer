import React from 'react';
import { Loader } from '@react-three/drei';
import { useTheme } from 'react-jss';
import { useViewStore } from '../../stores/ViewStore';
import ObjectView from './ObjectView';
import ArView from './ArView';

const Viewer = () => {
  const { currentView } = useViewStore();
  const theme = useTheme();

  const viewComponent = currentView === 'ar' ? <ArView /> : <ObjectView />;

  return currentView !== 'none' ? (
    <>
      {viewComponent}
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

export default Viewer;
