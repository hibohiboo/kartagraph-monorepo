import { getSrc } from '@kartagraph-app/domain/images/getSrc';
import { useTutorialHooks } from '@kartagraph-app/hooks/useTutorialHooks';
import Card from '@kartagraph-ui/components/Card/Card';
import { GameFrame } from '@kartagraph-ui/index';

export default function TutorialPage() {
  const vm = useTutorialHooks();
  return (
    <GameFrame {...vm.frameArgs}>
      <Card
        name="宿の娘"
        src={getSrc('/images/characters/recept/laugh.png')}
        style={{ position: 'absolute', top: '50px', left: '100px' }}
        onClick={vm.cardClick}
      />
    </GameFrame>
  );
}
