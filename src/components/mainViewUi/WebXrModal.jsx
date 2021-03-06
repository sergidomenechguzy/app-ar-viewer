import React, { useEffect } from 'react';
import useOpenState from '../../hooks/useOpenState';
import { useViewStore } from '../../stores/ViewStore';
import { useXrSession } from '../../stores/XrSessionStore';
import WebXrClosedModal from './WebXrClosedModal';
import WebXrNotSupportedModal from './WebXrNotSupportedModal';
import WebXrSupportedModal from './WebXrSupportedModal';

const WebXrModal = () => {
  const { currentView } = useViewStore();
  const { xrSession, supportsWebXR, endSession } = useXrSession();
  const { dispatch } = useViewStore();
  const [isOpen, setOpened, setClosed] = useOpenState(false);

  useEffect(() => {
    if (currentView === 'none') {
      setOpened();
    }
  }, [currentView, setOpened]);

  useEffect(() => {
    document.onfullscreenchange = (event) => {
      if (currentView === 'ar' && document.fullscreenElement === null) {
        setOpened();
        if (xrSession.current) {
          endSession();
        }
        dispatch({ type: 'set3d' });
      }
    };
  }, [currentView, dispatch, endSession, setOpened, xrSession]);

  const modal = supportsWebXR ? (
    <WebXrSupportedModal open={isOpen} onClose={setClosed} />
  ) : (
    <WebXrNotSupportedModal open={isOpen} onClose={setClosed} />
  );

  return currentView === 'none' ? modal : <WebXrClosedModal open={isOpen} onClose={setClosed} />;
};

WebXrModal.displayName = 'WebXrModal';

WebXrModal.propTypes = {};

WebXrModal.defaultProps = {};

export default WebXrModal;
