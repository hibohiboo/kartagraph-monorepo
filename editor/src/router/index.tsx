import TopPage from '@kartagraph-editor/pages/TopPage';
import { PrivacyPolicy } from '@kartagraph-ui/components/static/PrivacyPolicy';
import { Agreement } from '@kartagraph-ui/index';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './components/RootLayout';
declare let VITE_DEFINE_BASE_PATH: string;
export const basePath = VITE_DEFINE_BASE_PATH;
export const router = createBrowserRouter(
  [
    {
      path: '/',
      children: [
        {
          path: '/',
          element: <TopPage />,
        },
      ],
      element: <RootLayout />,
    },
    { path: '/agreement', element: <Agreement /> },
    { path: '/privacy-policy', element: <PrivacyPolicy /> },
  ],
  {
    basename: `/${basePath}`,
  },
);
