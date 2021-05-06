import React, { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import threeEntryPoint from '../../webxr/threeEntryPoint';
import { useXRSession } from '../../stores/XRSessionStore';

const useStyles = createUseStyles((theme) => ({
  threeEntryPoint: {
    width: '100%',
    height: '100%',
  },
}));

const ArView = () => {
  const cls = useStyles();
  const threeWrapper = useRef(null);
  const { xrSession } = useXRSession();

  useEffect(() => {
    const init = async () => {
      if (threeWrapper?.current && xrSession?.current) {
        console.log('creating three scene', xrSession.current);
        await threeEntryPoint(threeWrapper.current, xrSession.current);
      }
    };
    init();
  }, [xrSession]);

  return xrSession?.current ? (
    <div className={cls.threeEntryPoint} ref={threeWrapper} id="threeWrapper" />
  ) : null;
};

export default ArView;
