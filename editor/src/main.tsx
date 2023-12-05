import React from 'react';
import ReactDOM from 'react-dom/client';
import { RoutesApp } from './router/RoutesApp';
import { Provider } from 'jotai';
import { gameCoreStore } from './store/worker/gameCore';

import './index.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={gameCoreStore}>
    <React.StrictMode>
      <RoutesApp />
    </React.StrictMode>
  </Provider>,
);
