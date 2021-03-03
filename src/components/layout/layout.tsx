import React from 'react';
import { Link } from 'react-router-dom';
import classes from './layout.module.css';

interface IProps {
  children: React.ReactNode;
}

function Layout({ children }: IProps) {
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

      {children}
    </div>
  );
}

export default Layout;
