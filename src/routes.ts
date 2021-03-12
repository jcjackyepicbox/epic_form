import loadable from '@loadable/component';
import { RouteProps } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import NotFound from './pages/404/404';
import { getUserWorkspace } from '../redux/actions/user.action';
import { getFormDataDetail } from '../redux/actions/form.action';
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

const Dashboard = loadable<any>(
  () => import('./pages/AdminForm/Dashboard/Dashboard'),
  {
    fallback: Loading(),
  }
);

const Create = loadable<any>(() => import('./pages/AdminForm/Create/Create'), {
  fallback: Loading(),
});

export interface IRouteApp extends RouteProps {
  loadData?: (store: any, token: string, id: string) => Promise<void>;
  requireAuth?: boolean;
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
    path: ['/dashboard', '/dashboard/:id'],
    exact: true,
    component: Dashboard,
    requireAuth: true,
    loadData: (dispatch: any, token: string) =>
      dispatch(getUserWorkspace(token)),
  },
  {
    path: '/forms/:id/create',
    exact: true,
    component: Create,
    requireAuth: true,
    loadData: (dispatch: any, token: string, id: string) => {
      dispatch(getFormDataDetail(token, id || ''));
    },
  },
  // Get necessary data
  {
    path: '/forms/:id/',
    requireAuth: true,
    loadData: (dispatch: any, token: string) =>
      dispatch(getUserWorkspace(token)),
  },
  {
    component: NotFound,
  },
];

export default routes;
