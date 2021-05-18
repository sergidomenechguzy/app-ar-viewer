import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import { useHideUiStore } from '../../stores/HideUiStore';

const useStyles = createUseStyles({
  base: {
    transition: ({ duration }) =>
      `opacity ${duration}ms ease-in-out, visibility 0ms linear 0ms, transform ${duration}ms ease-in-out`,
    opacity: 1,
    visibility: 'visible',
  },
  vanish: {
    transition: ({ duration }) =>
      `opacity ${duration}ms ease-in-out, visibility 0ms linear ${duration}ms, transform ${duration}ms ease-in-out`,
    opacity: 0,
    visibility: 'hidden',
  },
  up: {
    transform: 'translateY(-50px)',
  },
  down: {
    transform: 'translateY(50px)',
  },
});

const HideWrapper = ({ children, duration, direction, inverted }) => {
  const cls = useStyles({ duration });
  const { hidden } = useHideUiStore();

  return React.cloneElement(children, {
    className: clsx(
      cls.base,
      inverted ? !hidden && cls.vanish : hidden && cls.vanish,
      inverted ? !hidden && cls[direction] : hidden && cls[direction],
      children.props.className
    ),
  });
};

HideWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  duration: PropTypes.number,
  direction: PropTypes.oneOf(['up', 'down', 'none']),
  inverted: PropTypes.bool,
};

HideWrapper.defaultProps = {
  duration: 250,
  direction: 'none',
  inverted: false,
};

export default HideWrapper;
