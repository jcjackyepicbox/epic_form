import loadable from '@loadable/component';
import { RouteProps } from 'react-router-dom';
import NotFound from './pages/404/404';
import { getHomeData } from './service/common.service';

const About = loadable<any>(() => import('./pages/about/about'), {
  // fallback: ,
  ssr: false,
});

const Home = loadable<any>(() => import('./pages/home/home'), {
  // fallback: ,
});

export interface IRouteApp extends RouteProps {
  loadData?: () => Promise<any>;
}

const routes: IRouteApp[] = [
  {
    path: '/',
    exact: true,
    component: Home,
    loadData: getHomeData,
  },
  {
    path: '/about',
    exact: true,
    component: About,
  },
  {
    component: NotFound,
  },
];

export default routes;
