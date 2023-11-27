import CardWrapper from './atoms/CardWrapper';
import CardName from './atoms/CardName';

interface QuestionCardProps {
  title: string;
}
export default function QuestionCard(props: QuestionCardProps) {
  return (
    <CardWrapper>
      <CardName>{props.title}</CardName>
    </CardWrapper>
  );
}
