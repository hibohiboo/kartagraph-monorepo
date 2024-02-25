/* eslint-disable @typescript-eslint/no-var-requires */
import { putScenario } from '@kartagraph-backend/controllers/event/putScenarioController';

jest.mock('@kartagraph-backend/utils/repository', () => {
  return {
    execQuery: jest.fn(() => null),
  };
});

const s3Json = {
  id: 'a9ff348b-8a64-4dae-b658-c05ac44413fa',
  title: 'シナリオテスト',
  src: '/images/backgrounds/adv_inn_2.png',
  summary: 'テストサマリ',
  detail: '詳細',
};
const record = {
  s3: {
    object: {
      key: 'objectKey',
    },
  },
  eventTime: '2024-02-22T13:04:04.905Z',
};

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('putScenarioController', () => {
  test('execQueryが呼び出されること', async () => {
    const mock = require('@kartagraph-backend/utils/repository').execQuery as jest.Mock;

    await putScenario(s3Json, record);

    expect(mock).toHaveBeenCalledTimes(1);
  });
  test('引数が不足したイベントでエラーとなること', async () => {
    await expect(async () => {
      await putScenario(s3Json, record);
    }).rejects.toThrow();
  });
});
