// eslint-disable-next-line import/no-extraneous-dependencies
import { TagSummary } from '@kartagraph-types/index';
import { HttpResponse, http } from 'msw';

export const handlers = [
  http.put('/v1/api/tags', () => {
    return new HttpResponse(JSON.stringify({ id: 'abc-123' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.get('/v1/api/scenario/:scenarioId/tags', ({ params }) => {
    const { scenarioId } = params;
    const ret: TagSummary[] = [
      { tagName: '開始', userCount: 5 },
      { tagName: scenarioId as string, userCount: 1 },
    ];
    return new HttpResponse(JSON.stringify(ret), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.put('/v1/api/scenario', () => {
    return new HttpResponse(JSON.stringify({}), {
      status: 202,
    });
  }),
];
