const {
  Scene,
  PerspectiveCamera,
  HemisphereLight,
  WebGLRenderer,
  CylinderBufferGeometry,
  MeshPhongMaterial,
  Mesh,
  RingBufferGeometry,
  MeshBasicMaterial,
} = require('three');

let container;
let camera;
let scene;
let renderer;
let controller;

let reticle;

let hitTestSource = null;
let hitTestSourceRequested = false;

const init = () => {
  console.log('init');
  container = document.createElement('div');
  const el = document.getElementById('canvasWrapper');
  el.appendChild(container);

  scene = new Scene();

  camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

  const light = new HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);

  //

  renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);

  //

  // document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));

  //

  const geometry = new CylinderBufferGeometry(0.1, 0.1, 0.2, 32).translate(0, 0.1, 0);

  const onSelect = () => {
    if (reticle.visible) {
      const material = new MeshPhongMaterial({ color: 0xffffff * Math.random() });
      const mesh = new Mesh(geometry, material);
      mesh.position.setFromMatrixPosition(reticle.matrix);
      mesh.scale.y = Math.random() * 2 + 1;
      scene.add(mesh);
    }
  };

  controller = renderer.xr.getController(0);
  controller.addEventListener('select', onSelect);
  scene.add(controller);

  reticle = new Mesh(
    new RingBufferGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
    new MeshBasicMaterial()
  );
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  scene.add(reticle);

  //

  window.addEventListener('resize', onWindowResize, false);

  return renderer;
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

//

const animate = () => {
  renderer.setAnimationLoop(render);
};

const render = (timestamp, frame) => {
  if (frame) {
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

        reticle.visible = true;
        reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
      } else {
        reticle.visible = false;
      }
    }
  }

  renderer.render(scene, camera);
};

module.exports = {
  init,
  animate,
};
