let i = 0;
self.addEventListener('message', (event) => {
  console.log('event.data', event.data);
  if (event.data === 'init') {
    self.postMessage({
      message: {
        text: `「おはよう！
    今日も一日がんばろー」`,
        image: '/images/characters/recept/laugh.png',
      },
      background: {
        src: '/images/backgrounds/adv_inn_2.png',
      },
    });
  }
});

export default {};
