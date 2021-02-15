import { loadableReady } from '@loadable/component';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createAppStore from '../../../redux/store';
import App from './app';

let renderMethod = ReactDOM.hydrate;

declare global {
  interface Window {
    __PRELOADED_STATE__: any;
  }
}

if (module.hot) {
  module.hot.accept();
  renderMethod = ReactDOM.render;
}
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createAppStore(preloadedState);

loadableReady(() => {
  renderMethod(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('app')
  );
});
