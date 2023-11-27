import { SelectCards } from '@kartagraph-ui/components/SelectCards';
import { GameFrame, GameFrameProps } from '../GameFrame';

export type GameViewerProps = GameFrameProps & {
  selectItems?: string[];
};

export function GameViewer(props: GameViewerProps) {
  const {
    children,
    message,
    background,
    onClickMessage,
    selectItems = [],
  } = props;
  const gameFrameProps = { children, message, background, onClickMessage };
  return (
    <GameFrame
      {...gameFrameProps}
      messageDisabled={selectItems.length > 0}
      layerOverMessage={
        selectItems.length === 0 ? undefined : (
          <SelectCards selectItems={selectItems} />
        )
      }
    />
  );
}
