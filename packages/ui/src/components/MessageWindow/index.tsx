import styles from './index.module.css';
interface MessageWindowProps {
  text: string;
  fontSize?: string;
}
export default function MessageWindow({
  text,
  fontSize = '14px',
}: MessageWindowProps) {
  return (
    <div className={styles.window}>
      <div className={styles.text} style={{ fontSize }}>
        {text}
      </div>
    </div>
  );
}
