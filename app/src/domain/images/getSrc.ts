import { basePath } from '@kartagraph-app/router';

export const getSrc = (src: string) => {
  // if (import.meta.env.DEV) {
  //   return src;
  // }
  return `/${basePath}${src}`;
};
