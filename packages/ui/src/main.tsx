import React from 'react';
import ReactDOM from 'react-dom/client';
import Top from './components/Top/Top';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Top />
  </React.StrictMode>,
);
