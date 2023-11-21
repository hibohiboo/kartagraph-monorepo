import TopPage from '@kartagraph-app/pages/TopPage';
import TutorialPage from '@kartagraph-app/pages/TutorialPage';
import { createBrowserRouter } from 'react-router-dom';
declare let VITE_DEFINE_BASE_PATH: string;
export const basePath = VITE_DEFINE_BASE_PATH;
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <TopPage />,
    },
    {
      path: '/tutorial',
      element: <TutorialPage />,
    },
  ],
  {
    basename: `/${basePath}`,
  },
);
