import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import Typography from '../utility/Typography';

const useStyles = createUseStyles((theme) => ({
  listElement: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 3),
    minHeight: theme.spacing(5.5),
  },
  iconWrapper: {
    marginRight: theme.spacing(2),
  },
  name: {
    flexGrow: 1,
    paddingRight: theme.spacing(8),
  },
  info: {
    padding: theme.spacing(0, 3, 1, 3),
    color: theme.palette.text.secondary,
  },
}));

const SettingsListElement = ({ className, icon, name, action, info }) => {
  const cls = useStyles();

  return (
    <>
      <li className={clsx(cls.listElement, className)}>
        {icon ? (
          <div className={cls.iconWrapper}>
            {cloneElement(icon, { color: 'primary', size: 'h5' })}
          </div>
        ) : null}
        <Typography className={cls.name}>{name}</Typography>
        {action ? <div className={cls.actionWrapper}>{action}</div> : null}
      </li>
      {info ? (
        <Typography className={cls.info} variant="caption">
          {info}
        </Typography>
      ) : null}
    </>
  );
};

SettingsListElement.displayName = 'SettingsListElement';

SettingsListElement.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.element,
  name: PropTypes.string.isRequired,
  action: PropTypes.element,
};

SettingsListElement.defaultProps = {};

export default SettingsListElement;
