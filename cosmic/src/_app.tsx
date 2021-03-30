import React, { Dispatch, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { matchPath, Route, Switch, useLocation } from 'react-router-dom';
import routes from './routes';

const pathException = 'dashboard';

function getMatchPromises(path: string, dispatch: Dispatch<any>) {
  const matchPromises = routes // return array of components
    .map((route) => {
      const match = matchPath(path, route);

      return match && route.loadData
        ? route.loadData(dispatch, null, match.params)
        : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(reject);
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
