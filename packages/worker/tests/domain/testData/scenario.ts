export const scenario = {
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
export const scenarioMessages = {
  firstSceneId: 'scene1',
  scenes: [
    {
      id: 'scene1',
      backgroundImage: 'bg1',
      eventId: 'event1',
      events: [
        {
          id: 'event1',
          type: 'messages',
          data: { texts: ['a', 'b'], image: 'image1' },
          next: 'event2',
        },
        {
          id: 'event2',
          type: 'message',
          data: { text: 'c', image: 'image2' },
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

export const scenarioTags = {
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
          type: 'addTag',
          data: { name: 'タグ' },
          next: 'tag2',
        },
        {
          id: 'tag2',
          type: 'addTag',
          data: { name: 'キーコード' },
          next: 'event3',
        },
        {
          id: 'event3',
          type: 'message',
          data: { text: 'c', image: 'image2' },
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
