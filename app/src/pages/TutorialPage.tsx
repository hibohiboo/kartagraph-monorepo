import { getSrc } from '@kartagraph-app/domain/images/getSrc';
import Card from '@kartagraph-ui/components/Card/Card';
import { GameFrame } from '@kartagraph-ui/index';
import { useState } from 'react';

export default function TutorialPage() {
  const [message, setMessage] = useState(`「はい！ いらっしゃいませ！
  初めて見る顔ですね！
  冒険者の方ですか？」`);
  const exArgs = {
    message:
      (message && {
        text: message,
        image: getSrc('/images/characters/recept/laugh.png'),
      }) ||
      undefined,
    background: {
      src: getSrc('/images/backgrounds/adv_inn_2.png'),
    },
    onClickMessage: () => {
      setMessage(`「そうですか！」`);
    },
  };
  return (
    <GameFrame {...exArgs}>
      <Card
        name="宿の娘"
        src={getSrc('/images/characters/recept/laugh.png')}
        style={{ position: 'absolute', top: '50px', left: '100px' }}
      />
    </GameFrame>
  );
}
