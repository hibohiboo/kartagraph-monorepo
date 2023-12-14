import Layout from '@kartagraph-app/components/templates/Layout';
import TopPage from '@kartagraph-app/pages/TopPage';
import TutorialPage from '@kartagraph-app/pages/TutorialPage';
import { PrivacyPolicy } from '@kartagraph-ui/components/static/PrivacyPolicy';
import { Agreement } from '@kartagraph-ui/index';
import { createBrowserRouter } from 'react-router-dom';
declare let VITE_DEFINE_BASE_PATH: string;
export const basePath = VITE_DEFINE_BASE_PATH;
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <TopPage />,
        },
        {
          path: 'tutorial',
          element: <TutorialPage />,
        },
      ],
    },
    { path: '/agreement', element: <Agreement /> },
    { path: '/privacy-policy', element: <PrivacyPolicy /> },
  ],
  {
    basename: `/${basePath}`,
  },
);
