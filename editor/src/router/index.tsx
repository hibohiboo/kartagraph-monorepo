import { initReport } from '@kartagraph-editor/domain/analytics/analyticsService';
import TopPage from '@kartagraph-editor/pages/TopPage';
import ScenarioResultPage from '@kartagraph-editor/pages/scenario/ScenarioResultPage';
import { initUserIdAtom } from '@kartagraph-editor/store/auth/authAtom';
import { gameCoreStore } from '@kartagraph-editor/store/worker/gameCore';
import { PrivacyPolicy } from '@kartagraph-ui/components/static/PrivacyPolicy';
import { Agreement } from '@kartagraph-ui/index';
import { createBrowserRouter } from 'react-router-dom';
import { initMSW } from '../../tests/msw/browser';
import { RootLayout } from './components/RootLayout';
declare let VITE_DEFINE_BASE_PATH: string;
export const basePath = VITE_DEFINE_BASE_PATH;
export const router = createBrowserRouter(
  [
    {
      path: '/',
      loader: async () => {
        initReport();
        await initMSW();
        await gameCoreStore.set(initUserIdAtom);
        return null;
      },
      children: [
        {
          path: '/',
          element: <TopPage />,
        },
        {
          path: '/scenario/:scenarioId/result',
          loader: async ({ params }) => {
            const data = await fetch(
              `/v1/api/scenario/${params.scenarioId}/tags`,
            );
            const json = await data.json();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return json.map((tag: any) => ({
              tagName: tag.tag_name,
              count: tag.count,
            }));
          },
          element: <ScenarioResultPage />,
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
