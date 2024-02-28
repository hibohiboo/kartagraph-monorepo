import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from '.';

export function RoutesApp() {
  // mswの設定がされた後にrouterを作成するためにhooks内でrouterを作成する
  const router = useMemo(() => createRouter(), []);
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
}
