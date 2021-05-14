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

const customizeProperties = (mesh, userData) => {
  const meshProps = {};
  ['castShadow', 'receiveShadow'].forEach((propName) => {
    if (propName in userData) {
      meshProps[propName] = userData[propName];
      meshProps.needsUpdate = true;
    }
  });
  // eslint-disable-next-line no-param-reassign
  mesh.castShadow = true;
  // eslint-disable-next-line no-param-reassign
  mesh.needsUpdate = true;
  Object.entries(meshProps).forEach(([key, value]) => {
    // eslint-disable-next-line no-param-reassign
    mesh[key] = value;
    // eslint-disable-next-line no-param-reassign
    mesh.needsUpdate = true;
  });

  const materialsProps = {};
  ['metalness', 'roughness'].forEach((propName) => {
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
  const gltf = await gltfLoader.loadAsync(path);
  gltf.userData = userData;
  gltf.scene.name = 'current';
  ['position', 'rotation', 'scale'].forEach((key) => {
    if (gltf.userData[key]) {
      setTransform(gltf.scene, key, gltf.userData[key]);
    }
  });
  traverseMesh(gltf.scene.children, (child) => customizeProperties(child, userData));
  console.log(gltf);
  return gltf;
};

export default loadGltf;
