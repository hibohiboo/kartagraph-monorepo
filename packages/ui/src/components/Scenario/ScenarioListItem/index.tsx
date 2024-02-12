import { rubyText } from '@kartagraph-ui/components/atoms/rubyText';
import { BiSolidDetail } from 'react-icons/bi';
import styles from './index.module.css';
type ScenarioListItemProps = {
  id: string;
  title: string;
  src: string;
  summary: string;
  detail: string;
};

export function ScenarioListItem({
  id,
  title,
  src,
  summary,
  detail,
}: ScenarioListItemProps) {
  return (
    <div className={styles.letter}>
      <div
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: rubyText(title) }}
      ></div>
      <figure className={styles.figure}>
        {src && <img src={src} alt={title} className={styles.image} />}
      </figure>

      <div
        className={styles.summary}
        dangerouslySetInnerHTML={{ __html: rubyText(summary) }}
      />
      <div>
        <button
          className={styles.detail}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            alert(detail);
          }}
          title="詳細を見る"
        >
          <BiSolidDetail />
        </button>
      </div>
    </div>
  );
}
