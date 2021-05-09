import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import threeEntryPoint from '../../three/threeEntryPoint';
import { useXRSession } from '../../stores/XRSessionStore';
import { useSelectionStore } from '../../stores/SelectionStore';
import { useGltfStore } from '../../stores/GltfStore';
import FloatingButton from '../buttons/FloatingButton';
import ArExplainAnimation from './ArExplainAnimation';

const useStyles = createUseStyles((theme) => ({
  threeEntryPoint: {
    width: '100%',
    height: '100%',
  },
  placeButton: {
    position: 'fixed',
    bottom: theme.spacing(22),
    left: 0,
    right: 0,
    zIndex: 1,
    margin: 'auto',
  },
}));

const ArView = () => {
  const cls = useStyles();
  const threeWrapper = useRef(null);
  const threeScene = useRef(null);
  const [placed, setPlaced] = useState(false);
  const [hitTest, setHitTest] = useState(false);
  const { xrSession } = useXRSession();
  const { selected } = useSelectionStore();
  const { gltfs } = useGltfStore();
  const { t } = useTranslation();

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
      if (xrSession?.current) {
        console.log('creating three scene', xrSession.current);
        threeScene.current = await threeEntryPoint(
          threeWrapper.current,
          xrSession.current,
          setHitTest
        );
        if (gltfs && selected) {
          gltfs[selected].scene.visible = false;
          gltfs[selected].scene.userData.placed = false;
          gltfs[selected].scene.position.set(0, 0, 0);
          threeScene.current.add(gltfs[selected].scene);
        }
      }
    };

    if (threeScene.current === null) {
      init();
    } else if (gltfs && selected) {
      const selectedObject = threeScene.current.getObjectByName('current');
      if (selectedObject) {
        setPlaced(false);
        gltfs[selected].userData.placed = false;
        threeScene.current.remove(selectedObject);
      }
      gltfs[selected].scene.visible = false;
      gltfs[selected].scene.userData.placed = false;
      gltfs[selected].scene.position.set(0, 0, 0);
      threeScene.current.add(gltfs[selected].scene);
    }
  }, [gltfs, selected, xrSession]);

  return xrSession?.current ? (
    <>
      {selected && !hitTest ? <ArExplainAnimation /> : null}
      {selected && hitTest ? (
        <FloatingButton className={cls.placeButton} onClick={placeObject}>
          {placed ? t('Grab 3D-Object') : t('Place 3D-Object')}
        </FloatingButton>
      ) : null}
      <div className={cls.threeEntryPoint} ref={threeWrapper} id="threeWrapper" />
    </>
  ) : null;
};

export default ArView;
