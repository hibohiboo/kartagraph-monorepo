import { getSrc } from '@kartagraph-app/domain/images/getSrc';
import { scenarioListAtom } from '@kartagraph-app/store/scenario/list';
import { ScenarioListItem } from '@kartagraph-ui/index';

import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';

function ScenarioListPage() {
  const [{ data, isPending, isError }] = useAtom(scenarioListAtom);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      {data?.map((item) => (
        <Link
          key={item.id}
          to={`/scenario/${item.id}/`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <ScenarioListItem {...item} src={getSrc(`/${item.src}`)} />
        </Link>
      ))}
    </div>
  );
}

export default ScenarioListPage;
