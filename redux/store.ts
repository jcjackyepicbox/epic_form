import { createStore } from 'redux';
import appReducer, { ApplicationState } from './reducers';

function createAppStore(initialState: ApplicationState) {
  let store = createStore(appReducer(), initialState);

  if (module.hot && typeof module.hot.accept === 'function') {
    module.hot.accept('./reducers', () => {
      const nextGetReducers = require('./reducers/index').default;
      store.replaceReducer(nextGetReducers());
    });
  }

  return store;
}

export default createAppStore;
