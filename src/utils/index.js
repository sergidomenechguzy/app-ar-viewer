import { fromBuffer } from 'file-type';

export const generateType = async (buffer) => {
  const type = await fromBuffer(buffer);
  if (type?.ext) return type.ext;
  return type;
};

export const checkFileType = async (file) => {
  const buffer = await file.arrayBuffer();
  let type = await generateType(buffer);
  if (!type) {
    const filename = file.name.split('.');
    if (filename.length > 1) {
      type = filename.pop();
    }
  }
  return ['gltf', 'glb'].includes(type);
};
