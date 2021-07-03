import React, { Children } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import Divider from '../utility/Divider';

const useStyles = createUseStyles((theme) => ({
  settingsList: {
    width: '100%',
    padding: 0,
    margin: 0,
    marginBottom: theme.spacing(1.5),
  },
}));

const SettingsList = ({ children, className, ...rest }) => {
  const cls = useStyles();

  return (
    <ul className={clsx(cls.settingsList, className)}>
      <Divider />
      {Children.map(children, (child) => (
        <>
          {child}
          <Divider />
        </>
      ))}
    </ul>
  );
};

SettingsList.displayName = 'SettingsList';

SettingsList.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

SettingsList.defaultProps = {};

export default SettingsList;
