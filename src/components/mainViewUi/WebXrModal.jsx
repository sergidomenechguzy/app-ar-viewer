import React, { useEffect } from 'react';
import useOpenState from '../../hooks/useOpenState';
import { useViewStore } from '../../stores/ViewStore';
import { useXRSession } from '../../stores/XRSessionStore';
import WebXrNotSupportedModal from './WebXrNotSupportedModal';
import WebXrSupportedModal from './WebXrSupportedModal';

const WebXrModal = () => {
  const { currentView } = useViewStore();
  const { supportsWebXR } = useXRSession();
  const [isOpen, setOpened, setClosed] = useOpenState(false);

  useEffect(() => {
    if (currentView === 'none') {
      setOpened();
    }
  }, [currentView, setOpened]);

  const modal = supportsWebXR ? (
    <WebXrSupportedModal open={isOpen} onClose={setClosed} />
  ) : (
    <WebXrNotSupportedModal open={isOpen} onClose={setClosed} />
  );

  return currentView === 'none' ? modal : null;
};

export default WebXrModal;
