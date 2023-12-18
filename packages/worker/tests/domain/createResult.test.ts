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
          firstEvent: 'event1',
          sceneData: {
            background: { src: 'bg1' },
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
  });

  describe('next', () => {
    test('nextコマンドの場合、次のイベントを呼び出す(message)', () => {
      // シナリオ読み込み
      const init = createResult({
        command: 'initScenario',
        payload,
      });
      createResult({ command: 'trigger', payload: init?.payload.firstEvent });
      const ret = createResult({ command: 'next' });
      expect(ret).toEqual({
        command: 'message',
        payload: { text: 'text2', image: 'image1' },
      });
    });
    test('nextコマンドで次のコマンドがない場合、waitが返る', () => {
      // シナリオ読み込み
      const init = createResult({
        command: 'initScenario',
        payload,
      });
      createResult({ command: 'trigger', payload: init?.payload.firstEvent });
      createResult({ command: 'next' });
      const ret = createResult({ command: 'next' });
      expect(ret).toEqual({ command: 'wait' });
    });
    test('nextコマンドがmessagesの場合、messageをすべて流し終わってから次のイベントに遷移する', () => {
      // シナリオ読み込み
      const init = createResult({
        command: 'initScenario',
        payload: {
          scenarioJson: JSON.stringify(scenarioMessages),
          userId: 'userId',
        },
      });
      createResult({ command: 'trigger', payload: init?.payload.firstEvent });

      const ret = createResult({ command: 'next' });
      expect(ret).toEqual({
        command: 'message',
        payload: { text: 'b', image: 'image1' },
      });
    });
  });
  test('triggerコマンドの場合、指定されたイベントを呼び出す', () => {
    const init = createResult({
      command: 'initScenario',
      payload,
    });
    createResult({ command: 'trigger', payload: init?.payload.firstEvent });
    const ret = createResult({ command: 'trigger', payload: 'event2' });
    expect(ret).toEqual({
      command: 'message',
      payload: { text: 'text2', image: 'image1' },
    });
  });
  test('changeSceneコマンドの場合、指定されたシーンを準備する', () => {
    const [scene1, scene2] = scenario.scenes;
    const payload = {
      scenarioJson: JSON.stringify({
        ...scenario,
        scenes: [
          {
            ...scene1,
            events: [
              { id: 'ce', type: 'changeScene', data: { sceneId: 'scene2' } },
            ],
          },
          scene2,
        ],
      }),
      userId: 'userId',
    };
    createResult({
      command: 'initScenario',
      payload,
    });
    const ret = createResult({ command: 'trigger', payload: 'ce' });

    expect(ret).toEqual({
      command: 'changeScene',
      payload: {
        firstEvent: undefined,
        sceneData: {
          background: { src: 'bg2' },
          cards: [],
        },
      },
    });
  });
  describe('Tag', () => {
    test('addTagコマンドの場合、タグを追加し次のコマンドを呼ぶこと', () => {
      const init = createResult({
        command: 'initScenario',
        payload: {
          scenarioJson: JSON.stringify(scenarioTags),
          userId: 'userId',
        },
      });

      createResult({ command: 'trigger', payload: init?.payload.firstEvent });
      const ret = createResult({ command: 'next' });
      expect(ret?.command).toBe('message');
      expect(ret?.payload.text).toBe('c');
    });
    describe('分岐', () => {
      test('tagを持っていた場合の分岐ができること', () => {
        const init = createResult({
          command: 'initScenario',
          payload: {
            scenarioJson: JSON.stringify(scenarioTags),
            userId: 'userId',
          },
        });
        createResult({ command: 'trigger', payload: init?.payload.firstEvent });
        createResult({ command: 'next' });
        const ret = createResult({ command: 'next' });
        expect(ret?.command).toBe('message');
        expect(ret?.payload.text).toBe('d');
      });
    });
  });
});
