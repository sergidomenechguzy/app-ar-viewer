import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

const LazyLoad = ({ children }) => (
  <Suspense fallback={<div>loading ...</div>}>{children}</Suspense>
);

LazyLoad.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LazyLoad;
