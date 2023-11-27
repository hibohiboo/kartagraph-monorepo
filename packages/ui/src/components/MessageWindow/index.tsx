import styles from './index.module.css';
type AlignItems = 'start' | 'center' | 'end';
// | 'self-start'
// | 'self-end'
// | 'flex-start'
// | 'flex-end'
// | 'baseline'
// | 'normal'
// | 'stretch' // React.CSSProperties['alignItems'];
interface MessageWindowProps {
  text: string;
  fontSize?: string;
  style?: React.CSSProperties;
  className?: string;
  textVerticalAlign?: AlignItems;
  imageSrc?: string;
}
export default function MessageWindow({
  text,
  textVerticalAlign = 'center',
  fontSize = '18px',
  style,
  className,
  imageSrc,
}: MessageWindowProps) {
  return (
    <div className={`${styles.window} ${className}`} style={style}>
      {imageSrc && (
        <figure className={styles.image}>
          <img
            className={styles.img}
            src={imageSrc}
            alt={'message image'}
            width={74}
          />
        </figure>
      )}
      <div
        className={styles.text}
        style={{ fontSize, alignItems: textVerticalAlign }}
      >
        {text}
      </div>
    </div>
  );
}
