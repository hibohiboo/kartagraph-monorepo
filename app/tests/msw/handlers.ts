// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw';
import scenarioList from './responses/scenario/list.json';
import { tagsSample } from './responses/scenario/tags';

const headers = {
  'Content-Type': 'application/json',
};
export const handlers = [
  http.put('/v1/api/tags', () => {
    return new HttpResponse(JSON.stringify({ id: 'abc-123' }), {
      status: 200,
      headers,
    });
  }),
  http.get('/v1/api/scenario/:scenarioId/tags', ({ params }) => {
    const { scenarioId } = params;
    const ret = tagsSample(scenarioId as string);
    return new HttpResponse(JSON.stringify(ret), {
      status: 200,
      headers,
    });
  }),
  http.get('/v1/api/scenario/list', () => {
    return new HttpResponse(JSON.stringify(scenarioList), {
      status: 200,
      headers,
    });
  }),
];
