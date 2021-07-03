import React from 'react';
import { createUseStyles } from 'react-jss';
import useOpenState from '../../hooks/useOpenState';
import TopButtons from './TopButtons';
import ManageObjectsModal from '../manageObjects/ManageObjectsModal';
import BottomButtons from './BottomButtons';
import WebXrModal from './WebXrModal';
import ShowUiButton from '../buttons/ShowUiButton';

const useStyles = createUseStyles((theme) => ({
  ui: {
    position: 'relative',
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
      <ShowUiButton />
    </div>
  );
};

UiOverlay.displayName = 'UiOverlay';

UiOverlay.propTypes = {};

UiOverlay.defaultProps = {};

export default UiOverlay;
