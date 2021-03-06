import React from 'react';
import BaseIcon from './BaseIcon';

const CloseIcon = (props) => (
  <BaseIcon {...props}>
    <path d="M32.818,36L3.862,64.956C2.984,65.834 2.984,67.26 3.862,68.138C4.74,69.016 6.166,69.016 7.044,68.138L36,39.182L64.956,68.138C65.834,69.016 67.26,69.016 68.138,68.138C69.016,67.26 69.016,65.834 68.138,64.956L39.182,36L68.138,7.044C69.016,6.166 69.016,4.74 68.138,3.862C67.26,2.984 65.834,2.984 64.956,3.862L36,32.818L7.044,3.862C6.166,2.984 4.74,2.984 3.862,3.862C2.984,4.74 2.984,6.166 3.862,7.044L32.818,36Z" />
  </BaseIcon>
);

CloseIcon.displayName = 'CloseIcon';

CloseIcon.propTypes = {};

CloseIcon.defaultProps = {};

export default CloseIcon;
