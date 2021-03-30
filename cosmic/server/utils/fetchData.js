import { matchPath } from 'react-router-dom';
import { verifyTokenSync } from '../../shared/jwt';
import routes from '../../src/routes';

function getMatchPromises(path, dispatch, ctx) {
  let isRequireAuth = false;
  const matchPromises = routes // return array of components
    .map((route) => {
      const match = matchPath(path, route);

      if (match && route.requireAuth) {
        isRequireAuth = isRequireAuth || route.requireAuth;
      }

      return match && route.loadData
        ? route.loadData(dispatch, ctx, match.params)
        : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(reject);
        });
      }
    });

  return {
    matchPromises,
    isRequireAuth,
  };
}

function fetchDataByRoute(req, res, dispatch) {
  return new Promise(async (resolve, reject) => {
    const { path, cookies } = req;
    const token = cookies ? cookies.auth || '' : '';
    const { isRequireAuth, matchPromises } = getMatchPromises(
      path,
      dispatch,
      req
    );
    // Wait for all the loadData() calls to finish their async calls

    try {
      if (isRequireAuth) {
        await verifyTokenSync(token, process.env.SESSION_COOKIE_SECRET);
      }

      Promise.all(matchPromises)
        .then(() => resolve())
        .catch(() => reject());
    } catch (err) {
      return res.redirect(`/join?error=${encodeURIComponent(err.message)}`);
    }
  });
}

export { fetchDataByRoute };
