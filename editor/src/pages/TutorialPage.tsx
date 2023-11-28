import { getSrc } from '@kartagraph-editor/domain/images/getSrc';
import { useTutorialHooks } from '@kartagraph-editor/hooks/useTutorialHooks';
import Card from '@kartagraph-ui/components/Card/Card';
import { GameViewer } from '@kartagraph-ui/index';

export default function TutorialPage() {
  const vm = useTutorialHooks();
  return (
    <GameViewer {...vm.frameArgs}>
      <Card
        name="宿の娘"
        src={getSrc('/images/characters/recept/laugh.png')}
        style={{ position: 'absolute', top: '50px', left: '100px' }}
        onClick={vm.cardClick}
      />
    </GameViewer>
  );
}
