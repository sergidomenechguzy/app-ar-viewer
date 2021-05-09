import React from 'react';
import { createUseStyles } from 'react-jss';
import useOpenState from '../../hooks/useOpenState';
import TopButtons from './TopButtons';
import ManageObjectsModal from '../manageObjects/ManageObjectsModal';
import BottomButtons from './BottomButtons';
import WebXrModal from './WebXrModal';

const useStyles = createUseStyles((theme) => ({
  ui: {
    position: 'relative',
    zIndex: 2,
  },
}));

const UiOverlay = () => {
  const cls = useStyles();
  const [isOpen, setOpened, setClosed] = useOpenState(false);

  return (
    <div className={cls.ui}>
      <WebXrModal />
      <TopButtons />
      <ManageObjectsModal open={isOpen} onClose={setClosed} />
      <BottomButtons on3DClick={setOpened} />
    </div>
  );
};

export default UiOverlay;
