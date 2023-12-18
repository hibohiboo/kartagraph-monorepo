import { TagSummary } from '@kartagraph-types/index';
import { BaseWrapper } from '@kartagraph-ui/index';
import { FaTag, FaTwitter } from 'react-icons/fa6';
import styles from './index.module.css';

const calcPercentage = (count: number, total: number) => {
  return Math.floor((count / total) * 100);
};

export function ResultPage(props: { tagResults: TagSummary[] }) {
  const { tagResults } = props;
  const startTag = tagResults.find((tag) => tag.tagName === '開始');
  if (!startTag) {
    return (
      <BaseWrapper>シナリオを開始せずにここに来てしまいましたか</BaseWrapper>
    );
  }

  const otherTags = tagResults.filter((tag) => tag.tagName !== '開始');
  return (
    <BaseWrapper>
      <h3>シナリオクリア</h3>
      <div className={styles.itemsWrapper}>
        {otherTags.map((tag, i) => (
          <div className={styles.tag} key={i}>
            <FaTag className={styles.tagIcon} />
            {tag.tagName +
              ':' +
              calcPercentage(tag.userCount, startTag.userCount)}
            %
          </div>
        ))}
      </div>
      <div className={styles.assertion}>
        ご要望やご意見は
        <a href="https://twitter.com/hibohiboo">
          @hibohiboo&nbsp;
          <FaTwitter />
        </a>
        まで
      </div>
    </BaseWrapper>
  );
}
