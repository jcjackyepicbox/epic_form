import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import classes from './LandingLayout.module.css';

interface IProps {
  children: React.ReactNode;
}

function LandingLayout({ children }: IProps) {
  return (
    <div className={classes.LandingLayout}>
      <header className={classes.LandingNavbar}>
        <Link to="/" className={classes.EpicLogo}>
          <Logo />
        </Link>

        <div className={classes.SpacingNav} />

        <nav className={classes.Navbar}>
          <div className={classes.MenuListContainer}>
            <ul role="list" className={classes.MenuList}>
              <li role="listitem">
                <Link to="/">About</Link>
              </li>
              <li role="listitem">
                <Link to="/">Products</Link>
              </li>
            </ul>
          </div>

          <div className={classes.ButtonContainer}>
            <Button type="primary">
              <Link to="/login">Log in</Link>
            </Button>
            <Button type="secondary">
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        </nav>
      </header>

      {children}

      <footer className={classes.Footer}>
        <div className={classes.GridFooter}>
          <Link to="/" className={classes.EpicLogo}>
            <Logo />
          </Link>
          <div className={classes.Copyright}>
            © 2021 EpicForm. All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingLayout;
