import React, { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import threeEntryPoint from '../../three/threeEntryPoint';
import { useSelectionStore } from '../../stores/SelectionStore';
import { useGltfStore } from '../../stores/GltfStore';
import { useSnackbarStore } from '../../stores/SnackbarStore';

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
  const { showErrorMessage } = useSnackbarStore();

  useEffect(() => {
    const init = async () => {
      try {
        console.log('creating three scene');
        const [scene] = await threeEntryPoint(threeWrapper.current);
        threeScene.current = scene;
        if (gltfs && selected) {
          gltfs[selected].scene.visible = true;
          gltfs[selected].scene.position.set(0, -0.25, 0);
          threeScene.current.add(gltfs[selected].scene);
        }
      } catch (err) {
        console.warn('Something went wrong while initialising three scene.', err);
        showErrorMessage();
      }
    };

    if (threeScene.current === null) {
      init();
    } else {
      const selectedObject = threeScene.current.getObjectByName('current');
      if (selectedObject) {
        selectedObject.position.set(0, 0, 0);
        threeScene.current.remove(selectedObject);
      }
      if (gltfs && selected) {
        gltfs[selected].scene.visible = true;
        gltfs[selected].scene.position.set(0, -0.25, 0);
        threeScene.current.add(gltfs[selected].scene);
      }
    }
  }, [gltfs, selected, showErrorMessage]);

  return <div className={cls.threeEntryPoint} ref={threeWrapper} id="threeWrapper" />;
};

export default ObjectView;
