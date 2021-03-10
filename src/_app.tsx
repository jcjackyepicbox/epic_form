import React, { Dispatch, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { matchPath, Route, Switch, useLocation } from 'react-router-dom';
import routes, { IRouteApp } from './routes';

const pathException = 'dashboard';

async function fetchDataByRoute(
  path: string,
  dispatch: Dispatch<any>
): Promise<void> {
  const loadDataRoute = routes
    .filter((route: IRouteApp) => {
      const match = matchPath(path, route);
      return match && route.loadData;
    })
    .map((val) => {
      const { loadData } = val;
      if (loadData) {
        return () => loadData(dispatch, '');
      }

      return null;
    })[0];

  if (!loadDataRoute) {
    return;
  }

  await loadDataRoute();
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

  async function fetchPreloadData(pathname: string, callback: () => void) {
    await fetchDataByRoute(pathname, dispatch);
    callback();
  }

  useEffect(() => {
    if (
      currLocation.current !== pathname &&
      getExceptionPath(pathname, currLocation.current)
    ) {
      fetchPreloadData(pathname, () => {
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
