import styles from './index.module.css';
import BaseWrapper from '../../atoms/BaseWrapper';
import MessageWindow from '@kartagraph-ui/components/MessageWindow';
interface GameFrameProps {
  children?: React.ReactNode;
  message?: {
    text: string;
    image?: string;
  };
  background?: {
    src: string;
  };
  onClickMessage?: () => void;
}
export function GameFrame(props: GameFrameProps) {
  return (
    <BaseWrapper>
      {props.background && (
        <img src={props.background.src} className={styles.background} />
      )}
      <div className={styles.cardArea}>{props.children}</div>
      {props.message && (
        <>
          <MessageWindow
            className={styles.messageArea}
            text={props.message?.text ?? ''}
            imageSrc={props.message?.image ?? ''}
          />
          <div
            className={styles.messageAreaOverlay}
            onClick={props.onClickMessage}
          />
        </>
      )}
    </BaseWrapper>
  );
}
