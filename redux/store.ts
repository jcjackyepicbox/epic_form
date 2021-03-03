import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import appReducer, { ApplicationState } from './reducers';
import { initialTodoState } from './reducers/todo';

const initialAppStore: ApplicationState = {
  todoApp: { ...initialTodoState },
};

function createAppStore(initialState: ApplicationState = initialAppStore) {
  const store = createStore(appReducer(), initialState, applyMiddleware(thunk));

  if (module.hot && typeof module.hot.accept === 'function') {
    module.hot.accept('./reducers', () => {
      const nextGetReducers = require('./reducers/index').default;
      store.replaceReducer(nextGetReducers());
    });
  }

  return store;
}

export default createAppStore;
