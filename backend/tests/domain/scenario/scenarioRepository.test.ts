import { getScenarioList } from '@kartagraph-backend/domain/scenario/scenarioRepository';
import { scenarioListItem } from './data/scenarioList';

jest.mock('@kartagraph-backend/utils/repository', () => {
  return {
    execQuery: jest.fn(() => [scenarioListItem]),
  };
});

describe('getScenarioList', () => {
  test('getScenarioList', async () => {
    const ret = await getScenarioList();
    expect(ret[0]).toEqual({
      id: 'a9ff348b-8a64-4dae-b658-c05ac44413fa',
      title: 'シナリオテスト',
      src: '/images/backgrounds/adv_inn_2.png',
      summary: 'テストサマリ',
      detail: '詳細',
      s3_key: 'scenarios/a9ff348b-8a64-4dae-b658-c05ac44413fa.json',
      created: new Date('2024-02-22T13:04:04.905Z'),
      updated: new Date('2024-02-22T14:30:55.898Z'),
    });
  });
});
