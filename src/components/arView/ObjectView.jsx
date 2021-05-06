import React, { useRef, Suspense } from 'react';
import { createUseStyles } from 'react-jss';
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

const useStyles = createUseStyles((theme) => ({
  objectView: {
    width: '100%',
    height: '100%',
    background: `linear-gradient(180deg, ${theme.palette.background.absolute} 0%, ${theme.palette.background.viewerHighlight} 45%, ${theme.palette.background.viewerHighlight} 60%, ${theme.palette.background.absolute} 100%)`,
  },
}));

const Controls = (props) => {
  const domElement = document.getElementById('canvasWrapper');
  const ref = useRef();
  const { camera } = useThree();
  useFrame(() => ref?.current?.update());

  return <orbitControls ref={ref} args={[camera, domElement]} {...props} />;
};

const GltfAsset = ({ url }) => {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} dispose={null} position={[0, -0.25, 0]} />;
};

const ObjectView = () => {
  const cls = useStyles();

  return (
    <div id="canvasWrapper" className={cls.objectView}>
      <Canvas colorManagement>
        <Controls
          maxPolarAngle={(2.3 * Math.PI) / 3}
          minPolarAngle={Math.PI / 3}
          maxDistance={10}
          minDistance={1}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={1.5}
          enablePan={false}
        />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <GltfAsset url="media/wooden-chair/chair-beech.glb" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ObjectView;
