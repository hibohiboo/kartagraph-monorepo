import { getSrc } from '@kartagraph-app/domain/images/getSrc';
import Card from '@kartagraph-ui/components/Card/Card';
import { GameFrame } from '@kartagraph-ui/index';
import { useState } from 'react';
function* messagGenerator() {
  yield `「はい！ いらっしゃいませ！
  初めて見る顔ですね！
  冒険者の方ですか？」`;
  yield `「そうですか！」`;
}
const messageGen = messagGenerator();
const first = messageGen.next().value;
export default function TutorialPage() {
  const [gen, setGen] = useState(messageGen);
  const [message, setMessage] = useState(first);
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
      setMessage(gen.next().value);
    },
  };
  return (
    <GameFrame {...exArgs}>
      <Card
        name="宿の娘"
        src={getSrc('/images/characters/recept/laugh.png')}
        style={{ position: 'absolute', top: '50px', left: '100px' }}
        onClick={() => {
          const g = messagGenerator();
          setMessage(g.next().value);
          setGen(g);
        }}
      />
    </GameFrame>
  );
}
