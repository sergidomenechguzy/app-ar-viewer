import React, { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import threeEntryPoint from '../../three/threeEntryPoint';
import { useSelectionStore } from '../../stores/SelectionStore';
import { useGltfStore } from '../../stores/GltfStore';

const useStyles = createUseStyles((theme) => ({
  threeEntryPoint: {
    width: '100%',
    height: '100%',
    background: `linear-gradient(180deg, ${theme.palette.background.absolute} 0%, ${theme.palette.background.viewerHighlight} 45%, ${theme.palette.background.viewerHighlight} 60%, ${theme.palette.background.absolute} 100%)`,
  },
}));

const ObjectView = () => {
  const cls = useStyles();
  const threeWrapper = useRef(null);
  const threeScene = useRef(null);
  const { selected } = useSelectionStore();
  const { gltfs } = useGltfStore();

  useEffect(() => {
    const init = async () => {
      console.log('creating three scene');
      threeScene.current = await threeEntryPoint(threeWrapper.current);
      if (gltfs && selected) {
        gltfs[selected].scene.position.set(0, -0.25, 0);
        threeScene.current.add(gltfs[selected].scene);
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
      gltfs[selected].scene.position.set(0, -0.25, 0);
      threeScene.current.add(gltfs[selected].scene);
    }
  }, [gltfs, selected]);

  return <div className={cls.threeEntryPoint} ref={threeWrapper} id="threeWrapper" />;
};

export default ObjectView;
