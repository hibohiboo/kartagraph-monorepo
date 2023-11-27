import QuestionCard from '@kartagraph-ui/components/LargeCard/QuestionCard';

import { Carousel } from 'primereact/carousel';
import styles from './index.module.css';

type SelectItem = string;
type SelectCarouselProps = {
  selectItems: SelectItem[];
};
const itemTemplate = (item: SelectItem) => {
  return (
    <div className={styles.selectItemWrapper}>
      <QuestionCard title={item} />
    </div>
  );
};
export function SelectCarousel({ selectItems }: SelectCarouselProps) {
  return (
    <div className={styles.selectItemsWrapper}>
      <Carousel
        value={selectItems}
        numVisible={2}
        numScroll={2}
        circular={false}
        itemTemplate={itemTemplate}
      />
    </div>
  );
}
