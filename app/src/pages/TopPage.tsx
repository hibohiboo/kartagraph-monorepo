import { getSrc } from '@kartagraph-app/domain/images/getSrc';
import { useTransitionNavigate } from '@kartagraph-app/hooks/useTransitionNavigate';
import Card from '@kartagraph-ui/components/Card/Card';
import { Top } from '@kartagraph-ui/index';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
          transitionNavigate('/scenario/');
          setCardHide(true);
        }}
      />
      <footer
        style={{
          position: 'absolute',
          top: '85vh',
          fontSize: '1rem',
          background: '#000',
        }}
      >
        <Link to="/agreement" style={{ color: '#fff' }}>
          利用規約
        </Link>
        &nbsp;&nbsp;
        <Link to="/privacy-policy" style={{ color: '#fff' }}>
          プライバシーポリシー
        </Link>
      </footer>
    </Top>
  );
}
