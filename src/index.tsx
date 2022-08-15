import 'core-js';
import 'reflect-metadata';
import Client from 'react-dom/client';
import { BrowserRouter } from '@quick-toolkit/react-router-dom';
import { Suspense } from 'react';
import reportWebVitals from 'src/reportWebVitals';
import { router } from 'src/router';
import './styles/index.less';
import { FallbackLoading } from './components';

const container = document.getElementById('root');

if (container) {
  Client.createRoot(container).render(
    <BrowserRouter>
      <div className="app">
        <Suspense fallback={<FallbackLoading />}>{router.toElement()}</Suspense>
      </div>
    </BrowserRouter>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
