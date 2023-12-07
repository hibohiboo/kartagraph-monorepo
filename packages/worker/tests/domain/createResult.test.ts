import { createResult } from '@kartagraph-worker/domain/createResult';
const scenario = {
  firstSceneId: 'scene1',
  scenes: [
    {
      id: 'scene1',
      backgroundImage: 'bg1',
      eventId: 'event1',
      events: [
        {
          id: 'event1',
          type: 'message',
          data: { text: 'text1', image: 'image1' },
          next: 'event2',
        },
        {
          id: 'event2',
          type: 'message',
          data: { text: 'text2', image: 'image1' },
        },
      ],
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
  ],
};
describe('createResult', () => {
  test('初期化コマンドの場合、init関数を呼び出す', () => {
    const ret = createResult({
      command: 'init',
      payload: JSON.stringify(scenario),
    });
    expect(ret).toEqual({
      command: 'init',
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
  test('nextコマンドの場合、次のイベントを呼び出す(message)', () => {
    // シナリオ読み込み
    createResult({
      command: 'init',
      payload: JSON.stringify(scenario),
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
      command: 'init',
      payload: JSON.stringify(scenario),
    });
    createResult({ command: 'next' });
    const ret = createResult({ command: 'next' });
    expect(ret).toEqual({ command: 'wait' });
  });
});
