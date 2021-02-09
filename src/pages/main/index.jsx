import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// if (module.hot) {
//   module.hot.accept();
// }

ReactDOM.hydrate(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
