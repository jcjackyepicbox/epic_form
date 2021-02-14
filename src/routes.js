import React from 'react';
import loadable from '@loadable/component';
import NotFound from './pages/404/404';
import { getHomeData } from './service/common.service';

const About = loadable(() => import('./pages/about/about'), {
  fallback: <div>Loading</div>,
  ssr: false,
});
const Home = loadable(() => import('./pages/home/home'), {
  fallback: <div>Loading..</div>,
});

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    loadData: () => getHomeData(),
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
