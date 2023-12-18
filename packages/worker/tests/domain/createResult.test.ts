import { createResult } from '@kartagraph-worker/domain/createResult';
import { scenario, scenarioMessages, scenarioTags } from './testData/scenario';
const payload = { scenarioJson: JSON.stringify(scenario), userId: 'userId' };
global.fetch = jest.fn();
describe('createResult', () => {
  describe('initScenario', () => {
    test('初期化コマンドの場合、init関数を呼び出す', () => {
      global.fetch = jest.fn();

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
      expect(global.fetch).toHaveBeenCalledWith('/v1/api/tags', {
        method: 'PUT',
        body: JSON.stringify({
          scenarioId: 'test',
          tags: [{ tagName: '開始', tagType: 'scenario' }],
          userId: 'userId',
        }),
      });
    });
    test('初期化コマンドで選択肢をだす', () => {
      const [e1, ...rest] = scenario.scenes;
      const e1dash = {
        ...e1,
        select: [
          {
            label: '選択肢1',
            next: 'ea',
          },
          {
            label: '選択肢2',
            next: 'eb',
          },
        ],
      };
      const payload = {
        scenarioJson: JSON.stringify({
          ...scenario,
          scenes: [e1dash, ...rest],
        }),
        userId: 'userId',
      };
      const ret = createResult({
        command: 'initScenario',
        payload,
      });
      expect(ret).toEqual({
        command: 'initScenario',
        payload: {
          background: { src: 'bg1' },
          message: {
            text: 'text1',
            image: 'image1',
            select: [
              {
                label: '選択肢1',
                next: 'ea',
              },
              {
                label: '選択肢2',
                next: 'eb',
              },
            ],
          },
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
