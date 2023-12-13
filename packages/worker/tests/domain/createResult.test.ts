import { createResult } from '@kartagraph-worker/domain/createResult';
import { scenario, scenarioMessages, scenarioTags } from './testData/scenario';
const payload = { scenarioJson: JSON.stringify(scenario), userId: 'userId' };
describe('createResult', () => {
  test('初期化コマンドの場合、init関数を呼び出す', () => {
    const ret = createResult({
      command: 'initScenario',
      payload,
    });
    expect(ret).toEqual({
      command: 'initScenario',
      payload: {
        background: { src: 'bg1' },
        message: { text: 'text1', image: 'image1' },
        cards: [
          {
            name: 'cardName',
            src: '/cardImage.png',
            x: 100,
            y: 50,
            clickEventId: 'event2',
          },
        ],
      },
    });
  });

  describe('next', () => {
    test('nextコマンドの場合、次のイベントを呼び出す(message)', () => {
      // シナリオ読み込み
      createResult({
        command: 'initScenario',
        payload,
      });
      const ret = createResult({ command: 'next' });
      expect(ret).toEqual({
        command: 'message',
        payload: { text: 'text2', image: 'image1' },
      });
    });
    test('nextコマンドで次のコマンドがない場合、waitが返る', () => {
      // シナリオ読み込み
      createResult({
        command: 'initScenario',
        payload: payload,
      });
      createResult({ command: 'next' });
      const ret = createResult({ command: 'next' });
      expect(ret).toEqual({ command: 'wait' });
    });
    test('nextコマンドがmessagesの場合、messageをすべて流し終わってから次のイベントに遷移する', () => {
      // シナリオ読み込み
      createResult({
        command: 'initScenario',
        payload: {
          scenarioJson: JSON.stringify(scenarioMessages),
          userId: 'userId',
        },
      });
      const ret = createResult({ command: 'next' });
      expect(ret).toEqual({
        command: 'message',
        payload: { text: 'b', image: 'image1' },
      });
    });
  });
  test('triggerコマンドの場合、指定されたイベントを呼び出す', () => {
    createResult({
      command: 'initScenario',
      payload,
    });
    const ret = createResult({ command: 'trigger', payload: 'event2' });
    expect(ret).toEqual({
      command: 'message',
      payload: { text: 'text2', image: 'image1' },
    });
  });
  describe('Tag', () => {
    test('addTagコマンドの場合、タグを追加し次のコマンドを呼ぶこと', () => {
      createResult({
        command: 'initScenario',
        payload: {
          scenarioJson: JSON.stringify(scenarioTags),
          userId: 'userId',
        },
      });
      const ret = createResult({ command: 'next' });
      expect(ret?.command).toBe('message');
      expect(ret?.payload.text).toBe('c');
    });
    describe('分岐', () => {
      test('tagを持っていた場合の分岐ができること', () => {
        createResult({
          command: 'initScenario',
          payload: {
            scenarioJson: JSON.stringify(scenarioTags),
            userId: 'userId',
          },
        });
        createResult({ command: 'next' });
        const ret = createResult({ command: 'next' });
        expect(ret?.command).toBe('message');
        expect(ret?.payload.text).toBe('d');
      });
    });
  });
});
