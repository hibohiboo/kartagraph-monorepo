import BaseWrapper from '../atoms/BaseWrapper';
import styles from './Top.module.css';

export default function Top({ children }: { children?: React.ReactNode }) {
  return (
    <BaseWrapper>
      <div className={styles.top}>
        <h1>KarTaGraph</h1>
      </div>
      <div className={styles.top}>{children}</div>
    </BaseWrapper>
  );
}
