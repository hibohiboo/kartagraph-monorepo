/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  test('受領した結果が期待する場合じゃない場合のテスト', async () => {
    const mock = require('@kartagraph-backend/utils/repository').execQuery as jest.Mock;
    mock.mockImplementation(() => [{ ...scenarioListItem, s3_key: undefined } as any]);

    await expect(async () => {
      await getScenarioList();
    }).rejects.toThrow(/(?=.*s3_key)(?=.*Required)/s);
    // Throwされるメッセージは下記。 正規表現でs3_keyとRequiredが含まれることを確認
    // 改行を含むため、正規表現のオプションにsを指定

    // [
    //   {
    //     \"code\": \"invalid_type\",
    //     \"expected\": \"string\",
    //     \"received\": \"undefined\",
    //     \"path\": [
    //       \"s3_key\"
    //     ],
    //     \"message\": \"Required\"
    //   }
    // ]
  });
});
