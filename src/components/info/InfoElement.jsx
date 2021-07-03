import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import Typography from '../utility/Typography';

const useStyles = createUseStyles((theme) => ({
  infoElement: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  iconWrapper: {
    marginRight: theme.spacing(4),
  },
}));

const InfoElement = ({ info, icon, className }) => {
  const cls = useStyles();

  return (
    <div className={clsx(cls.infoElement, className)}>
      <div className={cls.iconWrapper}>{cloneElement(icon, { color: 'primary', size: 'h5' })}</div>
      <Typography>{info}</Typography>
    </div>
  );
};

InfoElement.displayName = 'InfoElement';

InfoElement.propTypes = {
  info: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  className: PropTypes.string,
};

InfoElement.defaultProps = {};

export default InfoElement;
