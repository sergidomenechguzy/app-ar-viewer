import React from 'react';
import BaseIcon from './BaseIcon';

const CheckIcon = (props) => (
  <BaseIcon {...props}>
    <path d="M71.5,19.375C71.5,8.958 63.042,0.5 52.625,0.5C52.625,0.5 19.375,0.5 19.375,0.5C8.958,0.5 0.5,8.958 0.5,19.375C0.5,19.375 0.5,52.625 0.5,52.625C0.5,63.042 8.958,71.5 19.375,71.5L52.625,71.5C63.042,71.5 71.5,63.042 71.5,52.625C71.5,52.625 71.5,19.375 71.5,19.375ZM67,19.375L67,52.625C67,60.558 60.558,67 52.625,67C52.625,67 19.375,67 19.375,67C11.442,67 5,60.558 5,52.625L5,19.375C5,11.442 11.442,5 19.375,5L52.625,5C60.558,5 67,11.442 67,19.375Z" />
  </BaseIcon>
);

CheckIcon.displayName = 'CheckIcon';

CheckIcon.propTypes = {};

CheckIcon.defaultProps = {};

export default CheckIcon;
