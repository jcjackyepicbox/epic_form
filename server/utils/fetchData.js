import { matchPath } from 'react-router-dom';
import routes from '../../src/routes';
import { ensureLoggedIn } from '../api/middlewares/ensureLogged';

function getMatchPromises(path) {
  let isRequireAuth = false;
  const matchPromises = routes // return array of components
    .map((route) => {
      const match = matchPath(path, route);

      if (match && route.requireAuth) {
        isRequireAuth = isRequireAuth || route.requireAuth;
      }

      return match && route.loadData ? route.loadData(dispatch) : null;
    }) // Return an array of promises, since we're calling loadData(), which returns async promises
    .map((promise) => {
      // Make sure it's not null
      if (promise) {
        return new Promise((resolve, reject) => {
          // When the inner promise gets resolved or rejected...
          promise.then(resolve).catch(resolve);
        });
      }
    });

  return {
    matchPromises,
    isRequireAuth,
  };
}

function fetchDataByRoute(req, res, dispatch) {
  return new Promise((resolve, reject) => {
    const { path } = req;
    const { isRequireAuth, matchPromises } = getMatchPromises(path);
    // Wait for all the loadData() calls to finish their async calls

    ensureLoggedIn(isRequireAuth)(req, res, () => {
      Promise.all(matchPromises)
        .then(() => resolve())
        .catch(() => reject());
    });
  });
}

export { fetchDataByRoute };
