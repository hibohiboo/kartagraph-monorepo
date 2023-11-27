import QuestionCard from '@kartagraph-ui/components/LargeCard/QuestionCard';
import styles from './index.module.css';

type SelectItem = string;
type SelectCarouselProps = {
  selectItems: SelectItem[];
};
const itemTemplate = (item: SelectItem, i: number) => {
  return (
    <div className={styles.selectItemWrapper} key={i}>
      <QuestionCard title={item} />
    </div>
  );
};
export function SelectCards({ selectItems }: SelectCarouselProps) {
  return (
    <div className={styles.container}>
      <div className={styles.selectItemsWrapper}>
        {selectItems.map(itemTemplate)}
      </div>
    </div>
  );
}
