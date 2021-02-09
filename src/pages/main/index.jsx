import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

let renderMethod = ReactDOM.hydrate;

if (module.hot) {
  module.hot.accept();
  renderMethod = ReactDOM.render;
}

renderMethod(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
