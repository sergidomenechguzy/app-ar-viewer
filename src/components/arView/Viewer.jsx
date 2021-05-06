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
          backgroundColor: '#00000000',
        }}
        innerStyles={{
          backgroundColor: theme.palette.text.primary,
        }}
        barStyles={{
          backgroundColor: theme.palette.background.absolute,
        }}
        dataStyles={{
          color: theme.palette.text.primary,
        }}
      />
    </>
  ) : null;
};

export default Viewer;
