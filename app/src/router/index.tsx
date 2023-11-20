import TopPage from '@kartagraph-app/pages/TopPage';
import { createBrowserRouter } from 'react-router-dom';
declare let VITE_DEFINE_BASE_PATH: string;
export const basePath = VITE_DEFINE_BASE_PATH;
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <TopPage />,
    },
  ],
  {
    basename: `/${basePath}`,
  },
);
