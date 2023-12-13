import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { initReport } from './domain/analytics/analyticsService';
import { RoutesApp } from './router/RoutesApp';
import { initUserIdAtom } from './store/auth/authAtom';
import { gameCoreStore } from './store/worker/gameCore';

import './index.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';

initReport();
gameCoreStore.set(initUserIdAtom);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={gameCoreStore}>
    <React.StrictMode>
      <RoutesApp />
    </React.StrictMode>
  </Provider>,
);
