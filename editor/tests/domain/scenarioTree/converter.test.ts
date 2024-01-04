import { convertScenario } from '@kartagraph-editor/domain/scenarioTree/converter';

describe('convertScenario', () => {
  test('Scenarioの第一階層を変換できること', () => {
    const ret = convertScenario({ id: 'test-id', title: 'test', scenes: [] });
    expect(ret.id).toBe('test-id');
    expect(ret.title).toBe('test');
  });
});
