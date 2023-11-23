import { getSrc } from '@kartagraph-app/domain/images/getSrc';
import { useCallback, useState } from 'react';
function* messagGenerator() {
  yield `「はい！ いらっしゃいませ！
  初めて見る顔ですね！
  冒険者の方ですか？」`;
  yield `「そうですか！」`;
}
const messageGen = messagGenerator();
const first = messageGen.next().value;
export const useTutorialHooks = () => {
  const [gen, setGen] = useState(messageGen);
  const [message, setMessage] = useState(first);
  const frameArgs = {
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
  const cardClick = useCallback(() => {
    const g = messagGenerator();
    setMessage(g.next().value);
    setGen(g);
  }, []);
  return { frameArgs, cardClick };
};
