import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import ButtonBase from './ButtonBase';
import { useViewStore } from '../../stores/ViewStore';

const useStyles = createUseStyles((theme) => ({
  button: {
    padding: 0,
    borderRadius: '50%',
    backgroundColor: `${theme.palette.background.float}55`,
    width: theme.typography.h1.fontSize,
    height: theme.typography.h1.fontSize,
    boxShadow: theme.shadows[1],
  },
  inner: {
    borderRadius: '50%',
    backgroundColor: theme.palette.background.float,
    width: `calc(${theme.typography.h1.fontSize} * 0.85)`,
    height: `calc(${theme.typography.h1.fontSize} * 0.85)`,
  },
}));

const CameraButton = ({ className }) => {
  const cls = useStyles();
  const { currentView } = useViewStore();

  return currentView === 'ar' ? (
    <ButtonBase className={clsx(cls.button, className)} disableFocus={true}>
      <div className={cls.inner} />
    </ButtonBase>
  ) : null;
};

CameraButton.propTypes = {
  className: PropTypes.string,
};

export default CameraButton;
