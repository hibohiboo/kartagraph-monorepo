import { TagSummary } from '@kartagraph-types/index';
import { ResultPage } from '@kartagraph-ui/index';
import { useLoaderData } from 'react-router-dom';
function ScenarioResultPage() {
  const tagResults = useLoaderData() as TagSummary[];
  return <ResultPage tagResults={tagResults} />;
}
export default ScenarioResultPage;
