import React from 'react';
import { createUseStyles } from 'react-jss';
import CameraButton from '../buttons/CameraButton';
import FloatingButton from '../buttons/FloatingButton';
import ThreeDViewerIcon from '../icons/ThreeDViewerIcon';
import ThreeDObjectSettingsIcon from '../icons/ThreeDObjectSettingsIcon';

const useStyles = createUseStyles((theme) => ({
  bottomButtons: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(0, 4),
    marginBottom: theme.spacing(9),
  },
}));

const BottomButtons = ({ on3DClick }) => {
  const cls = useStyles();

  return (
    <div className={cls.bottomButtons}>
      <FloatingButton>
        <ThreeDViewerIcon size="h4" />
      </FloatingButton>
      <CameraButton />
      <FloatingButton onClick={on3DClick}>
        <ThreeDObjectSettingsIcon size="h4" />
      </FloatingButton>
    </div>
  );
};

export default BottomButtons;
