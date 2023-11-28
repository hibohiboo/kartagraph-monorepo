import { GameViewer } from '@kartagraph-ui/index';
import type { GameViewerProps } from '@kartagraph-ui/index';

function ScenarioPreviewer(props: {
  frame: GameViewerProps;
  cards: React.ReactNode[];
}) {
  return <GameViewer {...props.frame}>{props.cards}</GameViewer>;
}

export default ScenarioPreviewer;
