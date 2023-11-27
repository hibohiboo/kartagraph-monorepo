import QuestionCard from '@kartagraph-ui/components/LargeCard/QuestionCard';
import { GameFrame, GameFrameProps } from '../GameFrame';
import styles from './index.module.css';

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
          <div className={styles.selectItemsWrapper}>
            {selectItems.map((item, i) => (
              <QuestionCard title={item} key={i} />
            ))}
          </div>
        )
      }
    />
  );
}
