import React from 'react';
import styles from './Top.module.css';

export default function Top(props: {
  children: React.ReactNode;
  // style?: React.CSSProperties;
  // onClick?: () => void;
}) {
  return <div className={styles.top}>{props.children}</div>;
}
