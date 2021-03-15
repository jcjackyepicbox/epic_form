export const deepCopy = (arr: any) => {
  const copy: any = [];
  arr.forEach((elem: any) => {
    if (Array.isArray(elem)) {
      copy.push(deepCopy(elem));
    } else {
      if (typeof elem === 'object') {
        copy.push(deepCopyObject(elem));
      } else {
        copy.push(elem);
      }
    }
  });
  return copy;
};

// Helper function to deal with Objects
export const deepCopyObject = (obj: any) => {
  if (obj === null) {
    return null;
  }

  const tempObj: any = {};
  for (let [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      tempObj[key] = deepCopy(value);
    } else {
      if (typeof value === 'object') {
        tempObj[key] = deepCopyObject(value);
      } else {
        tempObj[key] = value;
      }
    }
  }
  return tempObj;
};
