export const get = <T>(obj: T, key: keyof T) => (obj != null ? obj[key] : null);

export const toJson = <T>(obj: T) => obj;

export const forEach = <T>(arr: T[], iterator: (x: T) => void) => arr.forEach(iterator);
