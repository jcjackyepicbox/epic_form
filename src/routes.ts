import loadable from '@loadable/component';
import { RouteProps } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import NotFound from './pages/404/404';

const About = loadable<JSX.Element>(() => import('./pages/About/About'), {
  fallback: Loading(),
  ssr: false,
});

const Home = loadable<any>(() => import('./pages/LandingPage/LandingPage'), {
  fallback: Loading(),
});

const Join = loadable<any>(() => import('./pages/Join/Join'), {
  fallback: Loading(),
});

const Dashboard = loadable<any>(() => import('./pages/Dashboard/Dashboard'), {
  fallback: Loading(),
});

export interface IRouteApp extends RouteProps {
  loadData?: (store: any) => Promise<void>;
}

const routes: IRouteApp[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    exact: true,
    component: About,
  },
  {
    path: '/join',
    exact: true,
    component: Join,
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
  },
  {
    component: NotFound,
  },
];

export default routes;
