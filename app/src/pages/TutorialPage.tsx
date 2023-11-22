import { getSrc } from '@kartagraph-app/domain/images/getSrc';
import Card from '@kartagraph-ui/components/Card/Card';

export default function TutorialPage() {
  return (
    <div style={{ position: 'relative' }}>
      <Card
        name="ナビ"
        src={getSrc('/images/characters/koko.png')}
        style={{ position: 'absolute', top: '50px', left: '100px' }}
      />
    </div>
  );
}
