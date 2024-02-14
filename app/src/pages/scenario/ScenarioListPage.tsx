import { getSrc } from '@kartagraph-app/domain/images/getSrc';
import { scenarioListAtom } from '@kartagraph-app/store/scenario/list';
import { ScenarioListItem } from '@kartagraph-ui/index';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
function ScenarioListPage() {
  const [{ data, isPending, isError }] = useAtom(scenarioListAtom);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div
      style={{
        position: 'relative',
        maxWidth: '550px',
        color: 'black',
        margin: 'auto',
      }}
    >
      <Slider {...settings}>
        {data?.map((item) => (
          <Link key={item.id} to={`/scenario/${item.id}/`}>
            <ScenarioListItem {...item} src={getSrc(`/${item.src}`)} />
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default ScenarioListPage;
