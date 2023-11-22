import styles from './Card.module.css';

interface CardProps {
  name: string;
  src: string;
  clickable?: boolean;
  onClick?: () => void;
  hide?: boolean;
  style?: React.CSSProperties;
}
export default function Card(props: CardProps) {
  const containerClasses = [
    props.clickable ? styles.clickable : '',
    props.hide === true ? styles.hide : '',
  ];
  return (
    <div
      className={`${styles.container} ${containerClasses.join(' ')}`}
      onClick={props.onClick}
      style={props.style}
    >
      <div className={styles.main}>
        <img
          className={styles.img}
          src={props.src}
          alt={props.name}
          width={74}
        />
        <div className={styles.title}>{props.name}</div>
      </div>
    </div>
  );
}
