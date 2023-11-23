import styles from './index.module.css';
import BaseWrapper from '../../atoms/BaseWrapper';
import MessageWindow from '@kartagraph-ui/components/MessageWindow';
interface GameFrameProps {
  children?: React.ReactNode;
  message?: string;
}
export function GameFrame(props: GameFrameProps) {
  return (
    <BaseWrapper>
      <div className={styles.cardArea}>{props.children}</div>
      <MessageWindow
        className={styles.messageArea}
        text={props.message ?? ''}
      />
    </BaseWrapper>
  );
}