import MessageWindow from '@kartagraph-ui/components/MessageWindow';
import { useEffect, useRef, useState } from 'react';
import BaseWrapper from '../../atoms/BaseWrapper';
import styles from './index.module.css';
import { useGetElementProperty } from './useGetElementProperty';

// https://camchenry.com/blog/how-to-disable-ui-and-control-focus-with-the-inert-attribute
declare module 'react' {
  interface HTMLAttributes<T> {
    /**
     * Prevents focus from moving to any element inside this DOM element and ignores user events.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert
     */
    inert?: 'inert';
  }
}

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
  messageDisabled?: boolean;
  layerUnderBackGround?: React.ReactNode;
  layerOverBackGround?: React.ReactNode;
  layerUnderMessage?: React.ReactNode;
  layerOverMessage?: React.ReactNode;
}

export function GameFrame(props: GameFrameProps) {
  const targetRef = useRef(null);
  const [scale, setScale] = useState(1);
  const { getElementProperty } =
    useGetElementProperty<HTMLDivElement>(targetRef);
  useEffect(() => {
    // console.log('height', getElementProperty('height'));
    // console.log('width', getElementProperty('width'));
    // console.log('x', getElementProperty('x'));
    // console.log('y', getElementProperty('y'));
    // console.log('top', getElementProperty('top'));
    // console.log('right', getElementProperty('right'));
    // console.log('bottom', getElementProperty('bottom'));
    // console.log('left', getElementProperty('left'));
    setScale(getElementProperty('width') / 640);
  }, []);

  return (
    <BaseWrapper ref={targetRef}>
      <div
        className={styles.container}
        style={{ transform: `scale(${scale})` }}
      >
        {props.layerUnderBackGround}
        {props.background && (
          <img src={props.background.src} className={styles.background} />
        )}
        {props.layerOverBackGround}
        <div
          className={styles.cardArea}
          inert={props.message?.text ? 'inert' : undefined}
        >
          {props.children}
        </div>
        {props.layerUnderMessage}
        {props.message && (
          <>
            <MessageWindow
              className={styles.messageArea}
              text={props.message?.text ?? ''}
              imageSrc={props.message?.image ?? ''}
            />
            <div
              inert={props.messageDisabled ? 'inert' : undefined}
              className={styles.messageAreaOverlay}
              onClick={props.onClickMessage}
            />
          </>
        )}
        {props.layerOverMessage}
      </div>
    </BaseWrapper>
  );
}
