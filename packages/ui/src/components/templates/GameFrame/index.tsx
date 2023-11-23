import styles from './index.module.css';
import BaseWrapper from '../../atoms/BaseWrapper';
import MessageWindow from '@kartagraph-ui/components/MessageWindow';
interface GameFrameProps {
  children?: React.ReactNode;
  message?: {
    text: string;
    image?: string;
  };
}
export function GameFrame(props: GameFrameProps) {
  return (
    <BaseWrapper>
      <div className={styles.cardArea}>{props.children}</div>
      <MessageWindow
        className={styles.messageArea}
        text={props.message?.text ?? ''}
        imageSrc={props.message?.image ?? ''}
      />
    </BaseWrapper>
  );
}
