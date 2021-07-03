import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import { useGesture } from 'react-use-gesture';
import threeEntryPoint from '../three/threeEntryPoint';
import { useXrSession } from '../stores/XrSessionStore';
import { useSelectionStore } from '../stores/SelectionStore';
import { useGltfStore } from '../stores/GltfStore';
import FloatingButton from '../components/buttons/FloatingButton';
import ArExplainAnimation from '../components/icons/ArExplainAnimation';
import { useSnackbarStore } from '../stores/SnackbarStore';
import HideWrapper from '../components/utility/HideWrapper';

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
  const { xrSession } = useXrSession();
  const { selected } = useSelectionStore();
  const { gltfs } = useGltfStore();
  const { t } = useTranslation();
  const { showErrorMessage } = useSnackbarStore();

  useEffect(() => {
    const element = threeWrapper.current || null;
    let touchCoordinate;

    const handleTouchStart = (event) => {
      touchCoordinate = event.targetTouches[0].screenX;
    };
    const handleTouchMove = (event) => {
      if (event.targetTouches.length === 1) {
        const currentTouchCoordinate = event.targetTouches[0].screenX;
        const delta = currentTouchCoordinate - touchCoordinate;
        if (gltfs[selected]) {
          gltfs[selected].scene.userData.rotate = delta / 40;
        }
        touchCoordinate = currentTouchCoordinate;
      }
    };
    const handleTouchEnd = (event) => {
      touchCoordinate = null;
      if (gltfs[selected]) {
        delete gltfs[selected].scene.userData.rotate;
      }
    };

    if (element) {
      element.addEventListener('touchstart', handleTouchStart);
      element.addEventListener('touchmove', handleTouchMove);
      element.addEventListener('touchend', handleTouchEnd);
      element.addEventListener('touchcancel', handleTouchEnd);
    }

    return () => {
      if (element) {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', handleTouchEnd);
        element.removeEventListener('touchcancel', handleTouchEnd);
      }
    };
  }, [gltfs, selected]);

  const handlePinch = useCallback(
    ({ offset: [scale] }) => {
      if (gltfs[selected]) {
        gltfs[selected].scene.userData.scale = scale / 200;
      }
    },
    [gltfs, selected]
  );

  const handlePinchEnd = useCallback(() => {
    if (gltfs[selected]) {
      delete gltfs[selected].scene.userData.scale;
    }
  }, [gltfs, selected]);

  const bind = useGesture({
    onPinch: handlePinch,
    onPinchEnd: handlePinchEnd,
  });

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
        // eslint-disable-next-line no-console
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
        selectedObject.rotation.set(0, 0, 0);
        selectedObject.scale.set(1, 1, 1);
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
          <FloatingButton
            className={cls.placeButton}
            onClick={placeObject}
            ariaLabel={placed ? t('Grab 3D-Object') : t('Place 3D-Object')}
          >
            {placed ? t('Grab 3D-Object') : t('Place 3D-Object')}
          </FloatingButton>
        </HideWrapper>
      ) : null}
      <div className={cls.threeEntryPoint} ref={threeWrapper} id="threeWrapper" {...bind()} />
    </>
  ) : null;
};

ArView.displayName = 'ArView';

ArView.propTypes = {};

ArView.defaultProps = {};

export default ArView;
