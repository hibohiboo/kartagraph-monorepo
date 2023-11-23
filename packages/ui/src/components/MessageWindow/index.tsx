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
}
export default function MessageWindow({
  text,
  textVerticalAlign = 'center',
  fontSize = '14px',
  style,
  className,
}: MessageWindowProps) {
  return (
    <div className={`${styles.window} ${className}`} style={style}>
      <div
        className={styles.text}
        style={{ fontSize, alignItems: textVerticalAlign }}
      >
        {text}
      </div>
    </div>
  );
}
