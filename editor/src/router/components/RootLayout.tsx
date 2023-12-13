import { getUserIdAtom } from '@kartagraph-editor/store/auth/authAtom';
import { useAtom } from 'jotai';
import { useOutlet } from 'react-router-dom';

export function RootLayout() {
  const outlet = useOutlet();
  const [userId] = useAtom(getUserIdAtom);
  if (!userId) {
    return <>Loading...</>;
  }
  return <>{outlet}</>;
}
