import { convertScenario } from '@kartagraph-editor/domain/scenarioTree/converter';
import scenario from './data/scenario.json';
describe('convertScenario', () => {
  test('Scenarioの第一階層を変換できること', () => {
    const ret = convertScenario({
      ...scenario,
      id: 'test-id',
      title: 'test',
      scenes: [],
    });
    expect(ret.id).toBe('test-id');
    expect(ret.title).toBe('test');
  });
  test('最初のシーンを変換できること', () => {
    const ret = convertScenario({
      ...scenario,
      firstSceneId: 'scene1',
      scenes: [
        {
          id: 'scene1',
          title: '冒険者の宿',
          eventId: 'event1',
          events: [],
          cards: [],
        },
        {
          id: 'scene2',
          title: '街',
          eventId: 'event2',
          events: [],
          cards: [],
        },
      ],
    });
    expect(ret.scenes[0].id).toBe('scene1');
    expect(ret.scenes[0].title).toBe('冒険者の宿');
    expect(ret.scenes[0].isFirstScene).toBe(true);
    expect(ret.scenes[1].id).toBe('scene2');
    expect(ret.scenes[1].title).toBe('街');
    expect(ret.scenes[1].isFirstScene).toBe(false);
  });

  test('初期イベントを変換できること', () => {
    const ret = convertScenario({
      ...scenario,
      firstSceneId: 'scene1',
      scenes: [
        {
          id: 'scene1',
          title: '冒険者の宿',
          eventId: 'event1',
          events: [
            {
              id: 'event1',
              type: 'message',
              data: {
                text: '「おはよう！\n今日もがんばろー」',
                image: '/images/characters/recept/laugh.png',
              },
            },
          ],
          cards: [],
        },
      ],
    });
    const [scene1] = ret.scenes;
    const event1 = scene1.event;
    expect(event1?.id).toBe('event1');
    expect(event1?.type).toBe('message');
    expect(event1?.data?.text).toBe('「おはよう！\n今日もがんばろー」');
  });
  test('初期イベントがないときにイベントが紐づけられないこと', () => {
    const ret = convertScenario({
      ...scenario,
      scenes: [
        {
          id: 'scene1',
          title: '冒険者の宿',
          events: [
            {
              id: 'event1',
              type: 'message',
              data: {
                text: '「おはよう！\n今日もがんばろー」',
                image: '/images/characters/recept/laugh.png',
              },
            },
          ],
          cards: [],
        },
      ],
    });
    const [scene1] = ret.scenes;
    const event1 = scene1.event;
    expect(event1).toBeUndefined();
  });
  test('イベントをネストできること', () => {
    const ret = convertScenario({
      ...scenario,
      firstSceneId: 'scene1',
      scenes: [
        {
          id: 'scene1',
          title: '冒険者の宿',
          eventId: 'event1',
          events: [
            {
              id: 'event1',
              type: 'message',
              data: { text: '「おはよう！」' },
              next: 'event2',
            },
            {
              id: 'event2',
              type: 'message',
              data: { text: '「今日もがんばろー」' },
            },
          ],
          cards: [],
        },
      ],
    });
    const [scene1] = ret.scenes;
    const event1 = scene1.event;
    expect(event1?.id).toBe('event1');
    expect(event1?.type).toBe('message');
    expect(event1?.data?.text).toBe('「おはよう！」');
    expect(event1?.next?.id).toBe('event2');
    expect(event1?.next?.data.text).toBe('「今日もがんばろー」');
  });
  test('選択肢のイベントをネストできること', () => {
    const ret = convertScenario({
      ...scenario,
      firstSceneId: 'scene1',
      scenes: [
        {
          id: 'scene1',
          title: '冒険者の宿',
          eventId: 'event1',
          events: [
            {
              id: 'event1',
              type: 'message',
              data: {
                text: '「おはよう！」',
                select: [
                  {
                    label: 'がんばろー',
                    next: 'event2',
                  },
                  {
                    label: 'ご飯',
                    next: 'gohan',
                  },
                ],
              },
            },
            {
              id: 'event2',
              type: 'message',
              data: { text: '「今日もがんばろー」' },
            },
          ],
          cards: [],
        },
      ],
    });
    const [scene1] = ret.scenes;
    const event1 = scene1.event;
    expect(event1?.id).toBe('event1');
    expect(event1?.type).toBe('message');
    expect(event1?.data?.text).toBe('「おはよう！」');
    expect(event1?.data?.select[0].label).toBe('がんばろー');
    expect(event1?.data?.select[0].next.data.text).toBe('「今日もがんばろー」');
  });
  test('シーン変更の場合次のシーンの名前が取得できること', () => {
    const ret = convertScenario({
      ...scenario,
      firstSceneId: 'scene1',
      scenes: [
        {
          id: 'scene1',
          title: '冒険者の宿',
          eventId: 'goodbye',
          events: [
            {
              id: 'goodbye',
              type: 'changeScene',
              data: {
                sceneId: 'scene2',
              },
            },
          ],
          cards: [],
        },
        {
          id: 'scene2',
          title: '街',
          events: [],
          cards: [],
        },
      ],
    });
    const [scene1] = ret.scenes;
    const event1 = scene1.event;
    expect(scene1.title).toBe('冒険者の宿');
    expect(event1.data.sceneId).toBe('scene2');
    expect(event1.data.title).toBe('街');
  });
});
