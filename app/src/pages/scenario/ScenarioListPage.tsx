import { scenarioListAtom } from '@kartagraph-app/store/scenario/list';

import { useAtom } from 'jotai';

function ScenarioListPage() {
  const [{ data, isPending, isError }] = useAtom(scenarioListAtom);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return <div>{JSON.stringify(data)}</div>;
}

export default ScenarioListPage;
