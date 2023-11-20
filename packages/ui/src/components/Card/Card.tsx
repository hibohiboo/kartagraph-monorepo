import React from 'react';
import styles from './Card.module.css';
interface CardProps {
  name: string;
  src: string;
  clickable?: boolean;
  onClick?: () => void;
}
export default function Card(props: CardProps) {
  const containerClass = props.clickable ? styles.clickable : '';
  return (
    <div
      className={`${styles.container} ${containerClass}`}
      onClick={props.onClick}
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
