import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Matrix4,
  AmbientLight,
  PointLight,
  HemisphereLight,
  ReinhardToneMapping,
  Mesh,
  PlaneBufferGeometry,
  DirectionalLight,
  ShadowMaterial,
  PCFSoftShadowMap,
  LightProbe,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let camera;
let scene;
let renderer;
let controls;

let hitTestSource = null;
let hitTestSourceRequested = false;
let setHitTest;

let xrLightProbe;
let estimatedDirectionalLight;
let estimatedLightProbe;

let ground;

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

const initThree = () => {
  scene = new Scene();
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100);

  // Add ambient lighting
  const ambient = new AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  // Add ground plane for object shadow
  const plane = new PlaneBufferGeometry(1000, 1000);
  plane.rotateX(-Math.PI / 2);
  const material = new ShadowMaterial();
  material.opacity = 0.15;
  ground = new Mesh(plane, material);
  ground.receiveShadow = true;
  scene.add(ground);

  // Setup renderer
  renderer = new WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.toneMapping = ReinhardToneMapping;
  renderer.toneMappingExposure = 2.3;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const addShadowLight = () => {
  const directionalLight = new DirectionalLight(0xffffff, 1, 250);
  directionalLight.position.set(0, 200, 0);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.bias = 0.0001;
  scene.add(directionalLight);
};

const initArViewer = async (xrSession, setHitTestProp) => {
  // Setup renderer for AR
  await renderer.getContext().makeXRCompatible();
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType('local');
  renderer.xr.setSession(xrSession);
  if (setHitTestProp) {
    setHitTest = setHitTestProp;
  }

  // Add lighting for estimation
  try {
    xrLightProbe = await xrSession.requestLightProbe();
    estimatedDirectionalLight = new DirectionalLight();
    estimatedDirectionalLight.castShadow = true;
    estimatedDirectionalLight.shadow.mapSize.width = 256;
    estimatedDirectionalLight.shadow.mapSize.height = 256;
    estimatedDirectionalLight.shadow.bias = 0.0001;
    scene.add(estimatedDirectionalLight);
    estimatedLightProbe = new LightProbe();
    scene.add(estimatedLightProbe);
  } catch (err) {
    addShadowLight();
  }
};

const init3dViewer = () => {
  // Add lighting without estimation
  const hemisphereLight = new HemisphereLight(0xffffff, 0x2f2609, 1.5);
  scene.add(hemisphereLight);

  const pointLight = new PointLight(0x785230, 0.2);
  pointLight.position.set(10, 10, 50);
  scene.add(pointLight);

  addShadowLight();

  // Position ground plane and camera
  ground.position.set(0, -0.25, 0);
  camera.position.set(0, 1, 3);

  // Add controls for camera movement
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
};

const applyLightEstimation = (frame) => {
  const lightEstimate = frame.getLightEstimate(xrLightProbe);
  if (lightEstimate) {
    const intensity = Math.max(
      1.0,
      Math.max(
        lightEstimate.primaryLightIntensity.x,
        Math.max(lightEstimate.primaryLightIntensity.y, lightEstimate.primaryLightIntensity.z)
      )
    );
    estimatedDirectionalLight.position.set(
      lightEstimate.primaryLightDirection.x,
      lightEstimate.primaryLightDirection.y,
      lightEstimate.primaryLightDirection.z
    );
    estimatedDirectionalLight.color.setRGB(
      lightEstimate.primaryLightIntensity.x / intensity,
      lightEstimate.primaryLightIntensity.y / intensity,
      lightEstimate.primaryLightIntensity.z / intensity
    );
    estimatedDirectionalLight.intensity = intensity;
    estimatedLightProbe.sh.fromArray(lightEstimate.sphericalHarmonicsCoefficients);
  }
};

const applyHitTest = (frame) => {
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
};

const applyGestureTransformation = () => {
  const selectedObject = scene.getObjectByName('current');
  if (selectedObject?.userData?.rotate) {
    selectedObject.rotateY(selectedObject.userData.rotate);
  }
  if (selectedObject?.userData?.scale) {
    const scale = Math.min(5, Math.max(0.1, 1 + selectedObject.userData.scale));
    selectedObject.scale.set(scale, scale, scale);
  }
};

const onXrFrame = (timestamp, frame) => {
  if (frame) {
    if (xrLightProbe) {
      applyLightEstimation(frame);
    }
    applyHitTest(frame);
    applyGestureTransformation();
  }

  renderer.render(scene, camera);
};

const animateXr = () => {
  renderer.setAnimationLoop(onXrFrame);
};

const animate3d = () => {
  requestAnimationFrame(animate3d);
  controls.update();
  renderer.render(scene, camera);
};

const threeEntryPoint = async (sceneRef, xrSession, setHitTestProp) => {
  initThree();

  if (xrSession && setHitTestProp !== undefined) {
    initArViewer(xrSession, setHitTestProp);
  } else {
    init3dViewer();
  }

  sceneRef.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);

  if (xrSession) {
    animateXr();
  } else {
    animate3d();
  }
  return [scene, renderer];
};

export default threeEntryPoint;
