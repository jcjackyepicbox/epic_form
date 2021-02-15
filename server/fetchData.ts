import { matchPath } from 'react-router-dom';
import routes, { IRouteApp } from '../src/routes';

function fetchDataByRoute(path: string): Promise<any> {
  return new Promise((resolve, reject) => {
    let promises: any | null = null;
    routes.forEach((route: IRouteApp) => {
      const match = matchPath(path, route);
      if (match && route.loadData) {
        promises = route.loadData;
      }
    });

    if (promises === null) {
      resolve({ data: [] });
    } else {
      promises()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    }
  });
}

export { fetchDataByRoute };
