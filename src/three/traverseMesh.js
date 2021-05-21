const traverseMesh = (mesh, callback) => {
  if (mesh.isMesh) {
    callback(mesh);
  } else if (mesh.children?.length > 0) {
    mesh.children.forEach((child) => traverseMesh(child, callback));
  } else if (Array.isArray(mesh)) {
    mesh.forEach((child) => traverseMesh(child, callback));
  }
};

export default traverseMesh;
