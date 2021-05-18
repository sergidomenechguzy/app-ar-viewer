import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Matrix4,
  AmbientLight,
  PointLight,
  SpotLight,
  HemisphereLight,
  ReinhardToneMapping,
  Mesh,
  PlaneBufferGeometry,
  DirectionalLight,
  ShadowMaterial,
  PCFSoftShadowMap,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let camera;
let scene;
let renderer;
let controls;

let hitTestSource = null;
let hitTestSourceRequested = false;
let setHitTest;

let ground;

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

const threeEntryPoint = async (sceneRef, xrSession, setHitTestProp) => {
  scene = new Scene();

  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100);

  const ambient = new AmbientLight(0xffffff, 1);
  scene.add(ambient);

  const hemisphereLight = new HemisphereLight(0xffeeb1, 0x4b401b, 4);
  scene.add(hemisphereLight);

  const spotLight = new SpotLight(0xffdc83, 2, 0, 0.15, 1);
  spotLight.position.set(10, 10, 50);
  scene.add(spotLight);

  const pointLight = new PointLight(0xffa95c, 1);
  pointLight.position.set(-10, -10, -10);
  scene.add(pointLight);

  const directionalLight = new DirectionalLight(0xffa95c, 1, 250);
  directionalLight.position.set(0, 200, 0);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.bias = 0.0001;
  scene.add(directionalLight);

  const plane = new PlaneBufferGeometry(1000, 1000);
  plane.rotateX(-Math.PI / 2);
  const material = new ShadowMaterial();
  material.opacity = 0.1;
  ground = new Mesh(plane, material);
  ground.receiveShadow = true;
  scene.add(ground);

  renderer = new WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.toneMapping = ReinhardToneMapping;
  renderer.toneMappingExposure = 2.3;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (xrSession && setHitTestProp !== undefined) {
    await renderer.getContext().makeXRCompatible();
    renderer.xr.enabled = true;
    renderer.xr.setReferenceSpaceType('local');
    renderer.xr.setSession(xrSession);
    if (setHitTestProp) {
      setHitTest = setHitTestProp;
    }
  } else {
    ground.position.set(0, -0.25, 0);
    camera.position.set(0, 1, 3);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 1.25;
    controls.minPolarAngle = Math.PI / 5;
    controls.maxDistance = 5;
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
  return [scene, renderer];
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
    if (selectedObject && selectedObject?.userData?.placed !== true) {
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
            ground.position.setFromMatrixPosition(mat);
            selectedObject.position.setFromMatrixPosition(mat);
            selectedObject.visible = true;
            setHitTest(true);
          }
        }
      }
    }
  }

  renderer.render(scene, camera);
};

export default threeEntryPoint;
