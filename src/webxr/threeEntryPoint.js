import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Matrix4,
  AmbientLight,
  PointLight,
  SpotLight,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let camera;
let scene;
let renderer;
const loader = new GLTFLoader();

let hitTestSource = null;
let hitTestSourceRequested = false;

let gltf;

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

const threeEntryPoint = async (sceneRef, xrSession) => {
  scene = new Scene();

  camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

  const ambient = new AmbientLight();
  scene.add(ambient);

  const spotLight = new SpotLight(0xffffff, 1, 0, 0.15, 1);
  spotLight.position.set(10, 10, 10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  const pointLight = new PointLight();
  pointLight.position.set(-10, -10, -10);
  scene.add(pointLight);

  renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  await renderer.getContext().makeXRCompatible();
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType('local');
  renderer.xr.setSession(xrSession);

  sceneRef.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);

  animate();
  await loadGltf();
  // await onRequestSession();
  // return xrSession;
};

const animate = () => {
  renderer.setAnimationLoop(render);
};

const render = (timestamp, frame) => {
  if (frame && gltf?.scene.visible === false) {
    const referenceSpace = renderer.xr.getReferenceSpace();
    const session = renderer.xr.getSession();

    if (hitTestSourceRequested === false) {
      session.requestReferenceSpace('viewer').then((referenceSpace2) => {
        session.requestHitTestSource({ space: referenceSpace2 }).then((source) => {
          hitTestSource = source;
        });
      });

      session.addEventListener('end', () => {
        hitTestSourceRequested = false;
        hitTestSource = null;
      });

      hitTestSourceRequested = true;
    }

    if (hitTestSource) {
      const hitTestResults = frame.getHitTestResults(hitTestSource);

      if (hitTestResults.length) {
        const hit = hitTestResults[0];
        const mat = new Matrix4();
        mat.fromArray(hit.getPose(referenceSpace).transform.matrix);

        if (mat) {
          console.log(mat);
          console.log(gltf);
          gltf.scene.position.setFromMatrixPosition(mat);
          gltf.scene.visible = true;
        }
      }
    }
  }

  renderer.render(scene, camera);
};

const loadGltf = () =>
  new Promise((resolve, reject) => {
    loader.load(
      'media/wooden-chair/chair-beech.glb',
      (asset) => {
        gltf = asset;
        // gltf.scene.scale.set(0.9, 0.9, 0.9);
        gltf.scene.visible = false;
        scene.add(gltf.scene);
        resolve();
      },
      undefined,
      (err) => {
        console.error(err);
        reject();
      }
    );
  });

export default threeEntryPoint;
