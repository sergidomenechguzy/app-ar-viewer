import React from 'react';
import PropTypes from 'prop-types';
import { useViewStore } from '../../stores/ViewStore';
import FloatingButton from './FloatingButton';
import ThreeDViewerIcon from '../icons/ThreeDViewerIcon';
import ArViewerIcon from '../icons/ArViewerIcon';
import { useXRSession } from '../../stores/XRSessionStore';
import requestSession from '../../webxr/requestSession';

const SwitchViewButton = ({ className }) => {
  const { currentView, dispatch } = useViewStore();
  const { xrSession, endSession, clearSession, supportsWebXR } = useXRSession();

  const changeView = async () => {
    if (currentView === 'ar') {
      endSession();
      dispatch({ type: 'set3d' });
    } else if (currentView === '3d' && supportsWebXR) {
      xrSession.current = await requestSession(clearSession);
      dispatch({ type: 'setAr' });
    }
  };

  return supportsWebXR ? (
    <FloatingButton className={className} onClick={changeView}>
      {currentView === '3d' ? <ArViewerIcon size="h4" /> : <ThreeDViewerIcon size="h4" />}
    </FloatingButton>
  ) : null;
};

SwitchViewButton.propTypes = {
  className: PropTypes.string,
};

export default SwitchViewButton;
