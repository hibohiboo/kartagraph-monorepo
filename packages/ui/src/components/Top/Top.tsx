import styles from './Top.module.css';
import BaseWrapper from '../atoms/BaseWrapper';

export default function Top({ children }: { children?: React.ReactNode }) {
  return (
    <BaseWrapper>
      <div className={styles.top}>
        <h1>カルタグラフ</h1>
      </div>
      <div className={styles.top}>{children}</div>
    </BaseWrapper>
  );
}
