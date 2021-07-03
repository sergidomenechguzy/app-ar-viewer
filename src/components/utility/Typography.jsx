import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

const useStyles = createUseStyles((theme) => ({
  typography: {
    color: ({ color }) => theme.palette.text[color],
  },
  h1: {
    ...theme.typography.h1,
  },
  h2: {
    ...theme.typography.h2,
  },
  h3: {
    ...theme.typography.h3,
  },
  h4: {
    ...theme.typography.h4,
  },
  h5: {
    ...theme.typography.h5,
  },
  h6: {
    ...theme.typography.h6,
  },
  subtitle1: {
    ...theme.typography.subtitle1,
  },
  subtitle2: {
    ...theme.typography.subtitle2,
  },
  body1: {
    ...theme.typography.body1,
  },
  body2: {
    ...theme.typography.body2,
  },
  caption: {
    ...theme.typography.caption,
  },
  overline: {
    ...theme.typography.overline,
  },
}));

const Typography = ({ children, className, variant, color }) => {
  const cls = useStyles({ color });

  return <div className={clsx(cls[variant], cls.typography, className)}>{children}</div>;
};

Typography.displayName = 'Typography';

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
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
    'caption',
    'overline',
  ]),
  color: PropTypes.oneOf(['primary', 'secondary', 'disabled', 'hint', 'icon']),
};

Typography.defaultProps = {
  className: null,
  variant: 'body1',
  color: 'primary',
};

export default Typography;
