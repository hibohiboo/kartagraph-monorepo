import { basePath } from '@kartagraph-editor/constants';

export const getSrc = (src: string) => {
  // if (import.meta.env.DEV) {
  //   return src;
  // }
  // srcの先頭に/がある場合は取り除く
  const trimedSrc = src.startsWith('/') ? src.slice(1) : src;
  return `/${basePath}/${trimedSrc}`;
};
