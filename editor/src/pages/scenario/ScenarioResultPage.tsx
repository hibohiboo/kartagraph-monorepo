import { ResultPage } from '@kartagraph-ui/index';
import { useLoaderData } from 'react-router-dom';
function ScenarioResultPage() {
  const tagResults = useLoaderData() as { tagName: string; count: number }[];
  console.log('tag result', tagResults);
  return <ResultPage tagResults={tagResults} />;
}
export default ScenarioResultPage;
