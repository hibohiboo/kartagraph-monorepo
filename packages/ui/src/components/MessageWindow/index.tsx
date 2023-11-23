import styles from './index.module.css';
interface MessageWindowProps {
  text: string;
  fontSize?: string;
  style?: React.CSSProperties;
  className?: string;
}
export default function MessageWindow({
  text,
  fontSize = '14px',
  style,
  className,
}: MessageWindowProps) {
  return (
    <div className={`${styles.window} ${className}`} style={style}>
      <div className={styles.text} style={{ fontSize }}>
        {text}
      </div>
    </div>
  );
}
