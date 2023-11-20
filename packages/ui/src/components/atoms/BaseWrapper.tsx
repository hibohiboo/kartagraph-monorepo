import React from 'react';
import styles from './BaseWrapper.module.css';

export default function BaseWrapper(props: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>{props.children}</div>
    </div>
  );
}
