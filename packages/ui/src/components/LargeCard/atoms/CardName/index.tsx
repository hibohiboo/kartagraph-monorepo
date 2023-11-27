import React from 'react';
import { rubyText } from '../../domain/rubyText';
import styles from './index.module.css';
export default function CardName(props: { children: React.ReactNode }) {
  return (
    <div
      className={styles.cardName}
      dangerouslySetInnerHTML={{ __html: rubyText(props.children?.toString()) }}
    ></div>
  );
}
