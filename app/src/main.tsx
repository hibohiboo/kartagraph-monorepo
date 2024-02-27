import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RoutesApp } from './router/RoutesApp';
import { gameCoreStore } from './store/worker/gameCore';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={gameCoreStore}>
    <React.StrictMode>
      <RoutesApp />
    </React.StrictMode>{' '}
  </Provider>,
);
