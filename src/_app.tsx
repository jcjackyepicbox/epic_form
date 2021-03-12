import { resolve } from 'path';
import React, { Dispatch, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  matchPath,
  Route,
  Switch,
  useLocation,
  useParams,
} from 'react-router-dom';
import routes from './routes';

const pathException = 'dashboard';

function getMatchPromises(path: string, dispatch: Dispatch<any>) {
  const matchPromises = routes // return array of components
    .map((route) => {
      const match = matchPath<{ id: string }>(path, route);

      return match && route.loadData
        ? route.loadData(dispatch, '', match.params.id)
        : null;
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

  return matchPromises;
}

function getExceptionPath(pathname: string, prevPathname: string) {
  if (
    pathname.includes(pathException) &&
    prevPathname.includes(pathException)
  ) {
    return false;
  }

  return true;
}

function App() {
  const { pathname } = useLocation();
  const currLocation = useRef(pathname);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      currLocation.current !== pathname &&
      getExceptionPath(pathname, currLocation.current)
    ) {
      const matchPromsies = getMatchPromises(pathname, dispatch);
      Promise.all(matchPromsies).then(() => {
        currLocation.current = pathname;
      });
    }
  }, [pathname]);

  return (
    <Switch>
      {routes.map((val, idx) => {
        return <Route key={idx} {...val} />;
      })}
    </Switch>
  );
}

export default App;
