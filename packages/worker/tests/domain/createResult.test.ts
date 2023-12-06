import { createResult } from '@kartagraph-worker/domain/createResult';

describe('createResult', () => {
  test('初期化コマンドの場合、init関数を呼び出す', () => {
    const ret = createResult({
      command: 'init',
      payload: JSON.stringify({
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
              },
            ],
            cards: [],
          },
        ],
      }),
    });
    expect(ret).toEqual({
      command: 'init',
      payload: {
        background: { src: 'bg1' },
        message: { text: 'text1', image: 'image1' },
      },
    });
  });
});
