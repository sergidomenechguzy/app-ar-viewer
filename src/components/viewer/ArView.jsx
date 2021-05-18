import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
// import { saveAs } from 'file-saver';
import threeEntryPoint from '../../three/threeEntryPoint';
import { useXRSession } from '../../stores/XRSessionStore';
import { useSelectionStore } from '../../stores/SelectionStore';
import { useGltfStore } from '../../stores/GltfStore';
import FloatingButton from '../buttons/FloatingButton';
import ArExplainAnimation from './ArExplainAnimation';
import CameraButton from '../buttons/CameraButton';
import { useSnackbarStore } from '../../stores/SnackbarStore';
import HideWrapper from '../utility/HideWrapper';

const useStyles = createUseStyles((theme) => ({
  threeEntryPoint: {
    width: '100%',
    height: '100%',
  },
  placeButton: {
    position: 'fixed',
    bottom: theme.spacing(5.5),
    left: 0,
    right: 0,
    zIndex: 1,
    margin: 'auto',
  },
  camera: {
    position: 'fixed',
    bottom: theme.spacing(5),
    left: 0,
    right: 0,
    zIndex: 2,
    margin: 'auto',
  },
}));

const ArView = () => {
  const cls = useStyles();
  const threeWrapper = useRef(null);
  const threeScene = useRef(null);
  const threeRenderer = useRef(null);
  const [placed, setPlaced] = useState(false);
  const [hitTest, setHitTest] = useState(false);
  const { xrSession } = useXRSession();
  const { selected } = useSelectionStore();
  const { gltfs } = useGltfStore();
  const { t } = useTranslation();
  const { showErrorMessage } = useSnackbarStore();

  const placeObject = useCallback(() => {
    if (placed === true) {
      gltfs[selected].scene.userData.placed = false;
      setPlaced(false);
    } else {
      gltfs[selected].scene.userData.placed = true;
      setPlaced(true);
    }
  }, [gltfs, placed, selected]);

  useEffect(() => {
    const init = async () => {
      try {
        if (xrSession?.current) {
          console.log('creating three scene', xrSession.current);
          const [scene, renderer] = await threeEntryPoint(
            threeWrapper.current,
            xrSession.current,
            setHitTest
          );
          threeScene.current = scene;
          threeRenderer.current = renderer;
          if (gltfs && selected) {
            gltfs[selected].scene.visible = false;
            gltfs[selected].scene.userData.placed = false;
            gltfs[selected].scene.position.set(0, 0, 0);
            threeScene.current.add(gltfs[selected].scene);
          }
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
        setPlaced(false);
        selectedObject.visible = true;
        selectedObject.userData.placed = false;
        threeScene.current.remove(selectedObject);
      }
      if (gltfs && selected) {
        gltfs[selected].scene.visible = false;
        gltfs[selected].scene.userData.placed = false;
        gltfs[selected].scene.position.set(0, 0, 0);
        threeScene.current.add(gltfs[selected].scene);
      }
    }
  }, [gltfs, selected, showErrorMessage, xrSession]);

  return xrSession?.current ? (
    <>
      {selected && !hitTest ? <ArExplainAnimation /> : null}
      {selected && hitTest ? (
        <HideWrapper direction="down">
          <FloatingButton className={cls.placeButton} onClick={placeObject}>
            {placed ? t('Grab 3D-Object') : t('Place 3D-Object')}
          </FloatingButton>
        </HideWrapper>
      ) : null}
      <div className={cls.threeEntryPoint} ref={threeWrapper} id="threeWrapper" />
    </>
  ) : null;
};

export default ArView;
