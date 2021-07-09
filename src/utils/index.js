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

const fallbackBreakpoints = {
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

export const createBreakpointUp = (theme) => {
  const { values } = theme?.breakpoints || fallbackBreakpoints;
  const unit = 'px';

  return (key) => {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  };
};

export const createBreakpointDown = (theme) => {
  const { keys, values } = theme?.breakpoints || fallbackBreakpoints;
  const unit = 'px';
  const step = 5;
  const up = createBreakpointUp(theme);

  return (key) => {
    const endIndex = keys.indexOf(key) + 1;
    const upperbound = values[keys[endIndex]];

    if (endIndex === keys.length) {
      // xl down applies to all sizes
      return up('xs');
    }

    const value = typeof upperbound === 'number' && endIndex > 0 ? upperbound : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  };
};

export const createSpacing = (theme) => {
  const themeSpacing = theme?.spacingUnit || 8;

  return (...args) =>
    args.reduce(
      (acc, curr, index) =>
        index !== 0 ? `${acc} ${curr * themeSpacing}px` : `${curr * themeSpacing}px`,
      ['']
    );
};

export const getDefaultScale = (gltf) => [
  gltf?.userData?.scale?.x || 1,
  gltf?.userData?.scale?.y || 1,
  gltf?.userData?.scale?.z || 1,
];

export const getDefaultRotation = (gltf) => [
  gltf?.userData?.rotation?.x || 0,
  gltf?.userData?.rotation?.y || 0,
  gltf?.userData?.rotation?.z || 0,
];
