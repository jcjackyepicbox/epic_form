import React from 'react';
import Logo from '../../components/Logo/Logo';
import classes from './Login.module.css';
import cx from 'classnames';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className={classes.Login}>
      <div className={classes.SpaceBlock}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo />
        </Link>
      </div>
      <div className={cx(classes.LoginDesc, classes.SpaceBlock)}>
        Hello there, Who's this?
      </div>
      <div className={classes.SpaceBlock}>
        <Button type="secondary">Sign in with Google</Button>
      </div>
    </div>
  );
}

export default Login;
