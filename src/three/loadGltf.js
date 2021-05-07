import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Math as Math3 } from 'three';

const gltfLoader = new GLTFLoader();

const setTransform = (object, transform, values) => {
  ['x', 'y', 'z'].forEach((key) => {
    let transformValue = values[key];
    if (transformValue && object[transform]) {
      if (transform === 'rotation') {
        transformValue = Math3.degToRad(transformValue);
      }
      // eslint-disable-next-line no-param-reassign
      object[transform][key] = transformValue;
    }
  });
};

const loadGltf = async (path, userData) => {
  try {
    const gltf = await gltfLoader.loadAsync(path);
    gltf.userData = userData;
    gltf.scene.name = 'current';
    ['position', 'rotation', 'scale'].forEach((key) => {
      if (gltf.userData[key]) {
        setTransform(gltf.scene, key, gltf.userData[key]);
      }
    });
    return gltf;
  } catch (err) {
    console.error('failed to load gltf', userData, err);
    return null;
  }
};

export default loadGltf;
