import { loadableReady } from '@loadable/component';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createAppStore from '../../../redux/store';
import App from './app';

let renderMethod = ReactDOM.hydrate;

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
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('app')
  );
});
