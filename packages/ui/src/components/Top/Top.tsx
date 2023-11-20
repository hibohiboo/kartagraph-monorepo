import styles from './Top.module.css';
import BaseWrapper from '../atoms/BaseWrapper';
import Card from '../Card/Card';

export default function Top() {
  return (
    <BaseWrapper>
      <div className={styles.top}>
        <h1>カルタグラフ</h1>
      </div>
      <div className={styles.top}>
        <Card name="スタート" src="/images/adv_inn_74x94.png" />
      </div>
    </BaseWrapper>
  );
}
