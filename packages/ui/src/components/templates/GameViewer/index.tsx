import { SelectCards } from '@kartagraph-ui/components/SelectCards';
import { GameFrame, GameFrameProps } from '../GameFrame';
import { SelectCardsProps } from '@kartagraph-ui/components/SelectCards/types';

export type GameViewerProps = GameFrameProps & SelectCardsProps;

export function GameViewer(props: GameViewerProps) {
  const {
    children,
    message,
    background,
    onClickMessage,
    selectItems = [],
    onSelected,
  } = props;
  const gameFrameProps = { children, message, background, onClickMessage };
  return (
    <GameFrame
      {...gameFrameProps}
      messageDisabled={selectItems.length > 0}
      layerOverMessage={
        selectItems.length === 0 ? undefined : (
          <SelectCards selectItems={selectItems} onSelected={onSelected} />
        )
      }
    />
  );
}
