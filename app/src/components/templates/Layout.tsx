import { BaseWrapper } from '@kartagraph-ui/index';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <BaseWrapper>
      <Outlet />
    </BaseWrapper>
  );
}
