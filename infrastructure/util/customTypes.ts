/**
 * オブジェクトを受け取り、そのオブジェクトのキーを返す
 * @param obj
 * @returns
 */
export const getKeys = <T extends { [key: string]: unknown }>(
  obj: T,
): (keyof T)[] => {
  return Object.keys(obj);
};
/**
 * オブジェクトを受けとり、そのオブジェクトのキーをキーとして持つオブジェクトを返す
 *
 * @param obj
 * @returns
 */
export const getKeyMap = <T extends { [key: string]: unknown }>(obj: T) => {
  const keys = getKeys(obj);
  type Keys = (typeof keys)[number];
  const keyMap = keys.reduce((acc, key) => ({ ...acc, [key]: key }), {}) as {
    [K in Keys]: K;
  };
  return keyMap;
};
