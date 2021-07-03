import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

const useStyles = createUseStyles((theme) => ({
  root: {
    userSelect: 'none',
    width: '1em',
    height: '1em',
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
  spin: {
    animation: '$rotate .75s linear infinite',
  },
  '@keyframes rotate': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
  background: {
    color: theme.palette.action.selected,
  },
}));

const Spinner = ({ variant, color, size, viewBox, className }) => {
  const cls = useStyles({ color, size });

  const variants = {
    small:
      'M36,4.828C53.216,4.828 67.172,18.784 67.172,36L71.672,36C71.672,16.299 55.701,0.328 36,0.328L36,4.828Z',
    medium:
      'M36,71.672C55.688,71.672 71.672,55.688 71.672,36C71.672,16.312 55.688,0.328 36,0.328L36,4.828C53.204,4.828 67.172,18.796 67.172,36C67.172,53.204 53.204,67.172 36,67.172L36,71.672Z',
    big:
      'M0.328,36C0.328,55.688 16.312,71.672 36,71.672C55.688,71.672 71.672,55.688 71.672,36C71.672,16.312 55.688,0.328 36,0.328L36,4.828C53.204,4.828 67.172,18.796 67.172,36C67.172,53.204 53.204,67.172 36,67.172C18.796,67.172 4.828,53.204 4.828,36L0.328,36Z',
    biggest:
      'M10.781,10.781C4.324,17.238 0.328,26.156 0.328,36C0.328,55.688 16.312,71.672 36,71.672C55.688,71.672 71.672,55.688 71.672,36C71.672,16.312 55.688,0.328 36,0.328L36,4.828C53.204,4.828 67.172,18.796 67.172,36C67.172,53.204 53.204,67.172 36,67.172C18.796,67.172 4.828,53.204 4.828,36C4.828,27.398 8.321,19.605 13.963,13.963L10.781,10.781Z',
  };

  return (
    <svg className={clsx(cls.root, cls.fontSize, cls.spin, className)} viewBox={viewBox}>
      <path
        className={cls.background}
        d="M36,0.328C16.312,0.328 0.328,16.312 0.328,36C0.328,55.688 16.312,71.672 36,71.672C55.688,71.672 71.672,55.688 71.672,36C71.672,16.312 55.688,0.328 36,0.328ZM36,4.828C53.204,4.828 67.172,18.796 67.172,36C67.172,53.204 53.204,67.172 36,67.172C18.796,67.172 4.828,53.204 4.828,36C4.828,18.796 18.796,4.828 36,4.828Z"
      />
      <path className={cls.color} d={variants[variant]} />
    </svg>
  );
};

Spinner.displayName = 'Spinner';

Spinner.propTypes = {
  variant: PropTypes.oneOf(['small', 'medium', 'big', 'biggest']),
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

Spinner.defaultProps = {
  variant: 'medium',
  color: 'primary',
  size: 'body1',
  viewBox: '0 0 72 72',
};

export default Spinner;
