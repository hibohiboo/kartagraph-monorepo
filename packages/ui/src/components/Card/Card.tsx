import React from 'react';
import styles from './Card.module.css';

export default function Card(props: { name: string; src: string }) {
  return (
    <div className={styles.container}>
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
