import { BiSolidDetail } from 'react-icons/bi';
import styles from './index.module.css';
type ScenarioListItemProps = {
  id: string;
  title: string;
  src: string;
  summary: string;
  detail: string;
  onClick: (id: string) => void;
};

export function ScenarioListItem({
  id,
  title,
  src,
  summary,
  detail,
  onClick,
}: ScenarioListItemProps) {
  return (
    <div className={styles.letter} onClick={() => onClick(id)}>
      <div className={styles.title}>{title}</div>
      <figure className={styles.figure}>
        {src && <img src={src} alt={title} className={styles.image} />}
      </figure>

      <div className={styles.summary}>{summary}</div>
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
