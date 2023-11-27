import { GameFrame, GameFrameProps } from '../GameFrame';
export type GameViewerProps = GameFrameProps;

export function GameViewer(props: GameViewerProps) {
  const { message, background, onClickMessage } = props;
  const gameFrameProps = { message, background, onClickMessage };
  return <GameFrame {...gameFrameProps}>{props.children}</GameFrame>;
}
