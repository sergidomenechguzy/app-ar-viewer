import React from 'react';
import { createUseStyles } from 'react-jss';
import useOpenState from '../../hooks/useOpenState';
import FloatingButton from '../buttons/FloatingButton';
import SettingsIcon from '../icons/SettingsIcon';
import SettingsModal from '../settings/SettingsModal';

const useStyles = createUseStyles((theme) => ({
  topButtons: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  settingsButton: {
    padding: theme.spacing(1),
  },
}));

const TopButtons = () => {
  const cls = useStyles();
  const [isOpen, setOpened, setClosed] = useOpenState(false);

  return (
    <>
      <div className={cls.topButtons}>
        <FloatingButton onClick={setOpened} className={cls.settingsButton}>
          <SettingsIcon size="h5" />
        </FloatingButton>
      </div>
      <SettingsModal open={isOpen} onClose={setClosed} />
    </>
  );
};

export default TopButtons;
