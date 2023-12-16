import { TagSummary } from '@kartagraph-types/index';
import { ResultPage } from '@kartagraph-ui/index';
import { useLoaderData } from 'react-router-dom';
function ScenarioResultPage() {
  const tagResults = useLoaderData() as TagSummary[];
  console.log('tag result', tagResults);
  return <ResultPage tagResults={tagResults} />;
}
export default ScenarioResultPage;
