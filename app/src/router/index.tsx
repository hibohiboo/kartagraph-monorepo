import Layout from '@kartagraph-app/components/templates/Layout';
import { basePath } from '@kartagraph-app/constants';
import scenario from '@kartagraph-app/data/scenario.json';
import { initReport } from '@kartagraph-app/domain/analytics/analyticsService';
import ScenarioPage from '@kartagraph-app/pages/ScenarioPage';
import TopPage from '@kartagraph-app/pages/TopPage';
import TutorialPage from '@kartagraph-app/pages/TutorialPage';
import ScenarioResultPage from '@kartagraph-app/pages/scenario/ScenarioResultPage';
import { initUserIdAtom } from '@kartagraph-app/store/auth/authAtom';
import { gameCoreStore } from '@kartagraph-app/store/worker/gameCore';
import { TagSummary } from '@kartagraph-types/index';
import { PrivacyPolicy } from '@kartagraph-ui/components/static/PrivacyPolicy';
import { Agreement } from '@kartagraph-ui/index';
import { createBrowserRouter } from 'react-router-dom';
import { initMSW } from '../../tests/msw/browser';
import { RootLayout } from './components/RootLayout';

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
        {
          path: 'scenario',
          element: <RootLayout />,
          children: [
            {
              path: ':scenarioId',
              index: true,
              loader: async () => {
                return JSON.stringify(scenario);
              },
              element: <ScenarioPage />,
            },
            {
              path: ':scenarioId/result',
              loader: async ({ params }) => {
                const data = await fetch(
                  `/v1/api/scenario/${params.scenarioId}/tags`,
                );
                const json = (await data.json()) as TagSummary[];
                return json;
              },
              element: <ScenarioResultPage />,
            },
          ],
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
