import { basePath } from '@kartagraph-editor/constants';

export const getSrc = (src: string) => {
  // if (import.meta.env.DEV) {
  //   return src;
  // }
  return `/${basePath}${src}`;
};
