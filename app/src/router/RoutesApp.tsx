import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from '.';

export function RoutesApp() {
  const memorizedRouter = useMemo(() => {
    // mswの設定がされた後にrouterを作成する
    return createRouter();
  }, []);
  return <RouterProvider router={memorizedRouter} future={{ v7_startTransition: true }} />;
}
