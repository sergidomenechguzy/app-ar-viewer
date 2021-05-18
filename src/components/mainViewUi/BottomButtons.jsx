import React from 'react';
import { createUseStyles } from 'react-jss';
import SwitchViewButton from '../buttons/SwitchViewButton';
import ManageObjectsButton from '../buttons/ManageObjectsButton';
import HideWrapper from '../utility/HideWrapper';

const useStyles = createUseStyles((theme) => ({
  bottomButtons: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: 'auto auto',
    gridTemplateAreas: '"switch manage"',
    margin: theme.spacing(0, 3, 5, 3),
  },
  switch: {
    gridArea: 'switch',
    justifySelf: 'start',
  },
  manage: {
    gridArea: 'manage',
    justifySelf: 'end',
  },
}));

const BottomButtons = ({ on3DClick }) => {
  const cls = useStyles();

  return (
    <HideWrapper direction="down">
      <div className={cls.bottomButtons}>
        <SwitchViewButton className={cls.switch} />
        <ManageObjectsButton className={cls.manage} onClick={on3DClick} />
      </div>
    </HideWrapper>
  );
};

export default BottomButtons;
