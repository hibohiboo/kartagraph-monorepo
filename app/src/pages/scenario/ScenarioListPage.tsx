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
  if (!data) return <div>Empty</div>;

  const wrapperStyle = {
    position: 'relative',
    maxWidth: '550px',
    color: 'black',
    margin: 'auto',
  } as const;
  const scenarioItems = data.map((item) => (
    <Link key={item.id} to={`/scenario/${item.id}/`}>
      <ScenarioListItem {...item} src={getSrc(`/${item.src}`)} />
    </Link>
  ));
  // データが１つだけのときにカルーセルを表示するとエラーになるので、その場合は1つだけの表示にする
  if (data.length === 1) {
    return <div style={wrapperStyle}>{scenarioItems}</div>;
  }

  return (
    <div style={wrapperStyle}>
      <Slider {...settings}>{scenarioItems}</Slider>
    </div>
  );
}

export default ScenarioListPage;
