export function isObject<T>(obj: T) {
  return obj && typeof obj === 'object';
}

type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never;

declare global {
  interface ObjectConstructor {
    keys<T>(o: T): ObjectKeys<T>;
  }
}

export function deepEqual<T>(obj1: T, obj2: T) {
  const keyObj1 = Object.keys(obj1);
  const keyObj2 = Object.keys(obj2);

  if (keyObj1.length !== keyObj2.length) {
    return false;
  }

  for (const valKey of keyObj1) {
    const value1 = obj1[valKey as keyof T];
    const value2 = obj2[valKey as keyof T];

    if (isObject(value1) && isObject(value2)) {
      if (!deepEqual(value1, value2)) {
        return false;
      }
    } else if (Array.isArray(value1) && Array.isArray(value2)) {
      if (!isArrayEqual(value1 as T[keyof T][], value2 as T[keyof T][])) {
        return false;
      }
    } else {
      if (value1 !== value2) {
        return false;
      }
    }
  }

  return true;
}

export function isArrayEqual<T>(arr1: T[], arr2: T[]) {
  return arr1.every((val, index) => {
    if (isObject(val) && isObject(arr2[index])) {
      if (!deepEqual(val, arr2[index])) {
        return false;
      }
    } else {
      if (val !== arr2[index]) {
        return false;
      }
    }

    return true;
  });
}
