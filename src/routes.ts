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

const Login = loadable<any>(() => import('./pages/Login/Login'), {
  fallback: Loading(),
});

const Signup = loadable<any>(() => import('./pages/Signup/Signup'), {
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
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/signup',
    exact: true,
    component: Signup,
  },
  {
    component: NotFound,
  },
];

export default routes;
