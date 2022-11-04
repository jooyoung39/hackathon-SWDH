// React Core
import React from 'react';
import ReactDOM from 'react-dom/client';
// React Router
import { BrowserRouter } from 'react-router-dom';
// Redux Store
import { Provider } from 'react-redux';
import { store } from './store';
// Context API
import ModalsProvider from './providers/ModalsProvider';
// Components
import Modals from './components/ModalsRenderer';
import App from './App';
import MenuBar from './components/MenuBar';
// Styles
import './assets/style/style.scss';
// External Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style/fa-all.css';
// PWA
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ModalsProvider>
          <Modals />
          <App />
        </ModalsProvider>
        <MenuBar />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

serviceWorkerRegistration.register();
