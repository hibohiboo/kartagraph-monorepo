import styles from './Top.module.css';
import BaseWrapper from '../atoms/BaseWrapper';

export default function Top() {
  return (
    <BaseWrapper>
      <div className={styles.top}>
        <h1>カルタグラフ</h1>
      </div>
    </BaseWrapper>
  );
}
