import loadable from '@loadable/component';
import { RouteProps } from 'react-router-dom';
import { getTodoList } from '../redux/actions/todo.action';
import Loading from './components/loading/loading';
import NotFound from './pages/404/404';

const About = loadable<JSX.Element>(() => import('./pages/about/about'), {
  fallback: Loading(),
  ssr: false,
});

const Home = loadable<any>(() => import('./pages/home/home'), {
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
    loadData: (dispatch: any) => dispatch(getTodoList()),
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
