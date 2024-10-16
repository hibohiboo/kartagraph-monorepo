const eitherIsNil = (a: unknown, b: unknown) => a == null || b == null;

export const hashDiff = <T extends { hash(): string }>(a: T, b: T) => {
  return eitherIsNil(a, b) || a.hash() !== b.hash();
};

// eslint-disable-next-line complexity
export const shallowObjDiff = (a: unknown, b: unknown) => {
  if (eitherIsNil(a, b) && !(a == null && b == null)) {
    return true;
  }

  if (a === b) {
    // can't do a diff on the same obj
    return false;
  }

  // non-object values can be compared with the equality operator
  if (typeof a !== 'object' || typeof b !== 'object') {
    return a !== b;
  }
  if (a == null || b == null) {
    throw new Error('unexpect null object');
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  const mismatches = (key: string) => (a as Record<string, unknown>)[key] !== (b as Record<string, unknown>)[key];

  if (aKeys.length !== bKeys.length) {
    return true;
  }

  if (aKeys.some(mismatches) || bKeys.some(mismatches)) {
    return true;
  }

  return false;
};
