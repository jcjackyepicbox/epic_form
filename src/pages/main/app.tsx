import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import classes from './app.module.css';
import routes from '../../routes';

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
        {routes.map((val, idx) => {
          return <Route key={idx} {...val} />;
        })}
      </Switch>
    </div>
  );
}

export default App;
