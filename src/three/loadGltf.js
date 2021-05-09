import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Math as Math3 } from 'three';
import traverseMesh from './traverseMesh';

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

const customizeMetalnessRoughness = (mesh, userData) => {
  const materialsProps = {};
  ['metalness', 'roughness', 'castShadow', 'receiveShadow'].forEach((propName) => {
    if (propName in userData) {
      materialsProps[propName] = userData[propName];
      materialsProps.needsUpdate = true;
    }
  });
  Object.entries(materialsProps).forEach(([key, value]) => {
    // eslint-disable-next-line no-param-reassign
    mesh.material[key] = value;
    // eslint-disable-next-line no-param-reassign
    mesh.material.needsUpdate = true;
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
    traverseMesh(gltf.scene.children, (child) => customizeMetalnessRoughness(child, userData));
    if (gltf.scene.children[0]) {
      const child = gltf.scene.children[0];
      let changeMesh;
      if (child.isMesh) {
        changeMesh = child;
      } else if (child.children && child.children[0] && child.children[0].isMesh) {
        [changeMesh] = child.children;
      }
      if (changeMesh) {
        customizeMetalnessRoughness(changeMesh, userData);
      }
    }
    console.log(gltf);
    return gltf;
  } catch (err) {
    console.error('failed to load gltf', userData, err);
    return null;
  }
};

export default loadGltf;
