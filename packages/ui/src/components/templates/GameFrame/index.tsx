import styles from './index.module.css';
import BaseWrapper from '../../atoms/BaseWrapper';
import MessageWindow from '@kartagraph-ui/components/MessageWindow';
import { useGetElementProperty } from './useGetElementProperty';
import { useEffect, useRef, useState } from 'react';
export interface GameFrameProps {
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
  const targetRef = useRef(null);
  const [scale, setScale] = useState(1);
  const { getElementProperty } =
    useGetElementProperty<HTMLDivElement>(targetRef);
  useEffect(() => {
    console.log('height', getElementProperty('height'));
    console.log('width', getElementProperty('width'));
    console.log('x', getElementProperty('x'));
    console.log('y', getElementProperty('y'));
    console.log('top', getElementProperty('top'));
    console.log('right', getElementProperty('right'));
    console.log('bottom', getElementProperty('bottom'));
    console.log('left', getElementProperty('left'));
    setScale(getElementProperty('width') / 640);
  }, []);
  return (
    <BaseWrapper ref={targetRef}>
      <div
        className={styles.container}
        style={{ transform: `scale(${scale})` }}
      >
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
      </div>
    </BaseWrapper>
  );
}
