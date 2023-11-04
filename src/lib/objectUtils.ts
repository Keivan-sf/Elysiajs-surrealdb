export const areAllPropertiesUndefined = (obj: Object): boolean => {
  for (const pair of Object.entries(obj)) {
    if (pair[1] !== undefined) return false;
  }
  return true;
};
