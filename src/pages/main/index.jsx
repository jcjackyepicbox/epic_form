import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

let renderMethod = ReactDOM.hydrate;

if (module.hot) {
  module.hot.accept();
  renderMethod = ReactDOM.render;
}

renderMethod(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app')
);
