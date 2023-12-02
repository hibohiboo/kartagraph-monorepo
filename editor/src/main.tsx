import React from 'react';
import ReactDOM from 'react-dom/client';
import { RoutesApp } from './router/RoutesApp';
import './index.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import { Provider } from 'jotai';
import { myStore } from './store/worker/test';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={myStore}>
    <React.StrictMode>
      <RoutesApp />
    </React.StrictMode>
  </Provider>,
);
