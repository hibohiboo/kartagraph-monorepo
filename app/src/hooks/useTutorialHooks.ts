import { getSrc } from '@kartagraph-app/domain/images/getSrc';
import { useCallback, useState } from 'react';
function* messagGenerator() {
  yield `「はい！ いらっしゃいませ！
  初めて見る顔ですね！
  冒険者の方ですか？」`;
  yield `「そうですか！」`;
  yield `「では！ 宿帳をかいてください」`;
}
const messageGen = messagGenerator();
const first = messageGen.next().value;
export const useTutorialHooks = () => {
  const [gen, setGen] = useState(messageGen);
  const [message, setMessage] = useState(first);
  const [questions, setQuestions] = useState<string[]>([]);
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
      const message = gen.next().value;
      setMessage(message);
      if (message === `「では！ 宿帳をかいてください」`) {
        setQuestions(['いいよ', 'やめとく']);
      }
    },
    selectItems: questions,
    onSelected: (item: string) => {
      if (item === 'いいよ') {
        setMessage(`「では！ こちらになりまーす」`);
      } else {
        setMessage(`「では！ おととい来やがれ！」`);
      }
      setQuestions([]);
    },
  };
  const cardClick = useCallback(() => {
    const g = messagGenerator();
    setMessage(g.next().value);
    setGen(g);
  }, []);
  return { frameArgs, cardClick };
};
