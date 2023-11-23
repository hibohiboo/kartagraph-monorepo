import { basePath } from '@kartagraph-editor/router';

export const getSrc = (src: string) => {
  // if (import.meta.env.DEV) {
  //   return src;
  // }
  return `/${basePath}${src}`;
};
