import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  root: {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'block',
    fill: 'currentColor',
    fillRule: 'evenodd',
    flexShrink: 0,
  },
  color: {
    color: ({ color }) => {
      switch (color) {
        case 'text':
          return theme.palette.text.primary;
        case 'icon':
          return theme.palette.text.icon;
        default:
          return theme.palette[color].main;
      }
    },
  },
  fontSize: {
    fontSize: ({ size }) => theme.typography[size].fontSize,
  },
}));

const BaseIcon = ({ children, color, size, viewBox, className }) => {
  const cls = useStyles({ color, size });

  return (
    <svg className={clsx(cls.root, cls.color, cls.fontSize, className)} viewBox={viewBox}>
      {children}
    </svg>
  );
};

BaseIcon.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    'text',
    'icon',
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success',
  ]),
  size: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
  ]),
  viewBox: PropTypes.string,
  className: PropTypes.string,
};

BaseIcon.defaultProps = {
  color: 'text',
  size: 'body1',
  viewBox: '0 0 72 72',
};

export default BaseIcon;
