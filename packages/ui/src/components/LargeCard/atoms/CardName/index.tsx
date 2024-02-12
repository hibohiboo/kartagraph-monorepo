import { rubyText } from '../../../atoms/rubyText';
import styles from './index.module.css';

const getFontSize = (text: string | undefined) => {
  if (!text) return '20px';
  if (text.length > 15) return '10px';
  if (text.length > 13) return '12px';
  if (text.length > 10) return '14px';
  return '20px';
};
export default function CardName(props: { text: string }) {
  return (
    <div
      style={{ fontSize: getFontSize(props.text) }}
      className={styles.cardName}
      dangerouslySetInnerHTML={{ __html: rubyText(props.text) }}
    ></div>
  );
}
