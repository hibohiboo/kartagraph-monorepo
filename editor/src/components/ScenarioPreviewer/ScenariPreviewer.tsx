import { GameFrame } from '@kartagraph-ui/index';
import type { GameFrameProps } from '@kartagraph-ui/index';

function ScenarioPreviewer(props: {
  frame: GameFrameProps;
  cards: React.ReactNode[];
}) {
  return <GameFrame {...props.frame}>{props.cards}</GameFrame>;
}

export default ScenarioPreviewer;
