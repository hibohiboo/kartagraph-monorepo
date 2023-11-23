import { getSrc } from '@kartagraph-editor/domain/images/getSrc';
import { useTransitionNavigate } from '@kartagraph-editor/hooks/useTransitionNavigate';
import Card from '@kartagraph-ui/components/Card/Card';
import { Top } from '@kartagraph-ui/index';
import { useState } from 'react';

export default function TopPage() {
  const { transitionNavigate } = useTransitionNavigate();
  const [cardHide, setCardHide] = useState(false);
  return (
    <Top>
      <Card
        hide={cardHide}
        name="スタート"
        src={getSrc('/images/adv_inn_74x94.png')}
        onClick={() => {
          transitionNavigate('/tutorial');
          setCardHide(true);
        }}
      />
    </Top>
  );
}
