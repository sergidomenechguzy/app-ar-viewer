import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Matrix4,
  AmbientLight,
  PointLight,
  SpotLight,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let camera;
let scene;
let renderer;
let controls;

let hitTestSource = null;
let hitTestSourceRequested = false;

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

const threeEntryPoint = async (sceneRef, xrSession) => {
  scene = new Scene();

  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100);

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

  if (xrSession) {
    await renderer.getContext().makeXRCompatible();
    renderer.xr.enabled = true;
    renderer.xr.setReferenceSpaceType('local');
    renderer.xr.setSession(xrSession);
  } else {
    camera.position.set(0, 0, 3);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = (2.3 * Math.PI) / 3;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxDistance = 10;
    controls.minDistance = 1;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 1.5;
    controls.enablePan = false;
    controls.update();
  }

  sceneRef.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);

  if (xrSession) {
    animateXR();
  } else {
    animate();
  }
  return scene;
};

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

const animateXR = () => {
  renderer.setAnimationLoop(renderWithHitTest);
};

const renderWithHitTest = (timestamp, frame) => {
  if (frame) {
    const selectedObject = scene.getObjectByName('current');
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

        if (mat && selectedObject) {
          console.log(mat);
          console.log(selectedObject);
          selectedObject.position.setFromMatrixPosition(mat);
          selectedObject.visible = true;
        }
      }
    }
  }

  renderer.render(scene, camera);
};

export default threeEntryPoint;
