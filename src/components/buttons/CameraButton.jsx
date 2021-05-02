import React from 'react';
import { createUseStyles } from 'react-jss';
import ButtonBase from './ButtonBase';

const useStyles = createUseStyles((theme) => ({
  button: {
    position: 'fixed',
    left: '50%',
    marginLeft: `calc(${theme.typography.h1.fontSize} * -0.5)`,
    padding: 0,
    borderRadius: '50%',
    backgroundColor: `${theme.palette.background.default}55`,
    width: theme.typography.h1.fontSize,
    height: theme.typography.h1.fontSize,
    boxShadow: theme.shadows[1],
  },
  inner: {
    borderRadius: '50%',
    backgroundColor: theme.palette.background.default,
    width: `calc(${theme.typography.h1.fontSize} * 0.8)`,
    height: `calc(${theme.typography.h1.fontSize} * 0.8)`,
  },
}));

const CameraButton = () => {
  const cls = useStyles();

  return (
    <ButtonBase className={cls.button} disableFocus={true}>
      <div className={cls.inner} />
    </ButtonBase>
  );
};

export default CameraButton;
