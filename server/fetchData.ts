import { matchPath } from 'react-router-dom';
import routes from '../src/routes';

function fetchDataByRoute(path: string, dispatch: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const promises = routes // return array of components
      .map((route) => {
        const match = matchPath(path, route);
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
    // Wait for all the loadData() calls to finish their async calls
    Promise.all(promises)
      .then(() => resolve())
      .catch(() => reject());
  });
}

export { fetchDataByRoute };
