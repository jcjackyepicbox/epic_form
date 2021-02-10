import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import NotFound from '../404/404';
import classes from './app.module.css';
import loadable from '@loadable/component';

const About = loadable(() => import('../about/about'), {
  fallback: <div>Loading</div>,
  ssr: false,
});
const Home = loadable(() => import('../home/home'), {
  fallback: <div>Loading..</div>,
});

function App() {
  return (
    <div className={classes.app}>
      <h1>Hello World</h1>
      <nav className={classes.navbar}>
        <Link className={classes.navlink} to="/">
          Home
        </Link>
        <Link className={classes.navlink} to="/about">
          About
        </Link>
        <Link className={classes.navlink} to="/404">
          Not Found
        </Link>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
