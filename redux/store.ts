import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import appReducer, { ApplicationState } from './reducers';
import { initialFormState } from './reducers/form';
import { initialGenericState } from './reducers/generic';
import { initialUserState } from './reducers/user';

const initialAppStore: ApplicationState = {
  user: { ...initialUserState },
  generic: { ...initialGenericState },
  form: { ...initialFormState },
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
