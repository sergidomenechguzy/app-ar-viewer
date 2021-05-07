import React, { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import threeEntryPoint from '../../three/threeEntryPoint';
import { useXRSession } from '../../stores/XRSessionStore';
import { useSelectionStore } from '../../stores/SelectionStore';
import { useGltfStore } from '../../stores/GltfStore';

const useStyles = createUseStyles((theme) => ({
  threeEntryPoint: {
    width: '100%',
    height: '100%',
  },
}));

const ArView = () => {
  const cls = useStyles();
  const threeWrapper = useRef(null);
  const threeScene = useRef(null);
  const { xrSession } = useXRSession();
  const { selected } = useSelectionStore();
  const { gltfs } = useGltfStore();

  useEffect(() => {
    const init = async () => {
      if (xrSession?.current) {
        console.log('creating three scene', xrSession.current);
        threeScene.current = await threeEntryPoint(threeWrapper.current, xrSession.current);
        if (gltfs && selected) {
          gltfs[selected].scene.visible = false;
          threeScene.current.add(gltfs[selected].scene);
        }
      }
    };

    if (threeScene.current === null) {
      init();
    } else if (gltfs && selected) {
      const selectedObject = threeScene.current.getObjectByName('current');
      if (selectedObject) {
        selectedObject.position.set(0, 0, 0);
        threeScene.current.remove(selectedObject);
      }
      gltfs[selected].scene.visible = false;
      threeScene.current.add(gltfs[selected].scene);
    }
  }, [gltfs, selected, xrSession]);

  return xrSession?.current ? (
    <div className={cls.threeEntryPoint} ref={threeWrapper} id="threeWrapper" />
  ) : null;
};

export default ArView;
