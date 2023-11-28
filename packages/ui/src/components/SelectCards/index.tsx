import QuestionCard from '@kartagraph-ui/components/LargeCard/QuestionCard';
import styles from './index.module.css';
import { SelectCardsProps, SelectItem, SelectedHandler } from './types';

const itemTemplate = (
  item: SelectItem,
  i: number,
  onSelected?: SelectedHandler,
) => {
  return (
    <div
      className={styles.selectItemWrapper}
      key={i}
      onClick={() => {
        if (onSelected) onSelected(item);
      }}
    >
      <QuestionCard title={item} />
    </div>
  );
};
export function SelectCards({ selectItems, onSelected }: SelectCardsProps) {
  if (!selectItems) return <></>;
  return (
    <div className={styles.container}>
      <div className={styles.selectItemsWrapper}>
        {selectItems.map((item, i) => itemTemplate(item, i, onSelected))}
      </div>
    </div>
  );
}
