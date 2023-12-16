// eslint-disable-next-line import/no-extraneous-dependencies
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
    return new HttpResponse(
      JSON.stringify([
        { tag_name: '開始', count: 5 },
        { tag_name: scenarioId, count: 1 },
      ]),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
];
