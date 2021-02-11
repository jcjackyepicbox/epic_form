import { createStore } from 'redux';
import appReducer from './reducers';

function createAppStore(initialState) {
  let store = createStore(appReducer(), initialState);

  if (module.hot && typeof module.hot.accept === 'function') {
    module.hot.accept('./reducers', () => {
      console.log('HEREEE');
      const nextGetReducers = require('./reducers/index').default;
      store.replaceReducer(nextGetReducers());
    });
  }

  return store;
}

export default createAppStore;
