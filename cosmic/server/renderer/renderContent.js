import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import path from 'path';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';

function renderContentLoadable(App, context, location, store) {
  let webStats = path.resolve(__dirname, '../../build/loadable-stats.json');

  if (process.env.NODE_ENV === 'development') {
    webStats = path.resolve(__dirname, '../../dev/stats.json');
  }
  const extractor = new ChunkExtractor({ statsFile: webStats });
  const jsx = extractor.collectChunks(
    <div id="app">
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </div>
  );

  const html = renderToString(jsx);
  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();

  return {
    html,
    scriptTags,
    linkTags,
    styleTags,
  };
}

function renderReduxState(preloadedState) {
  return `<script>window.__PRELOADED_STATE__=${serialize(
    preloadedState
  )}</script>`;
}

export { renderContentLoadable, renderReduxState };
