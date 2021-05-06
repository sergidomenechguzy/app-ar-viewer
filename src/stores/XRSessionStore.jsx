import PropTypes from 'prop-types';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import WebXRPolyfill from 'webxr-polyfill';

const Context = createContext();

const XRSessionStore = ({ children }) => {
  const xrSession = useRef(null);
  const [supportsWebXR, setSupportsWebXR] = useState(false);

  useEffect(() => {
    if (!('xr' in navigator)) {
      const polyfill = new WebXRPolyfill();
      console.log('Used polyfill for WebXR', polyfill);
    }
    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
        if (supported) {
          setSupportsWebXR(true);
        }
      });
    }
  }, []);

  return <Context.Provider value={{ xrSession, supportsWebXR }}>{children}</Context.Provider>;
};

XRSessionStore.propTypes = {
  children: PropTypes.node.isRequired,
};

export default XRSessionStore;

export const useXRSession = () => {
  const { xrSession, ...rest } = useContext(Context);

  const onSessionEnded = useCallback(() => {
    console.log('end', xrSession);
    if (xrSession?.current) {
      xrSession.current.end();
    }
    xrSession.current = null;
  }, [xrSession]);

  const clearSession = useCallback(() => {
    xrSession.current = null;
  }, [xrSession]);

  return {
    endSession: onSessionEnded,
    clearSession,
    xrSession,
    ...rest,
  };
};
