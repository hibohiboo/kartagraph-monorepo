import { ResultPage } from '@kartagraph-ui/index';
import { useLoaderData } from 'react-router-dom';
function ScenarioResultPage() {
  const tagResults = useLoaderData() as { tagName: string; count: number }[];
  return <ResultPage tagResults={tagResults} />;
}
export default ScenarioResultPage;
