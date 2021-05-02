import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  clickable: {
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    ...theme.typography.button,

    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      transition: 'background-color 0.2s',
    },
  },
  focus: {
    '&:focus': {
      '&::after': {
        backgroundColor: theme.palette.action.focus,
      },
    },
  },
  active: {
    '&:active': {
      '&::after': {
        backgroundColor: theme.palette.action.active,
      },
    },
  },
  noSelect: {
    '-webkit-tap-highlight-color': 'transparent',
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    userSelect: 'none',
  },
}));

const Clickable = ({ children, disableFocus, disableActive }) => {
  const cls = useStyles();
  return React.cloneElement(children, {
    className: clsx(
      cls.clickable,
      cls.noSelect,
      !disableFocus && cls.focus,
      !disableActive && cls.active,
      children.props.className
    ),
  });
};

Clickable.propTypes = {
  children: PropTypes.element.isRequired,
  disableFocus: PropTypes.bool,
  disableActive: PropTypes.bool,
};

Clickable.defaultProps = {
  disableFocus: false,
  disableActive: false,
};

export default Clickable;
