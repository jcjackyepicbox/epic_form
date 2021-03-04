import React from 'react';
import Logo from '../../components/Logo/Logo';
import classes from './Signup.module.css';
import cx from 'classnames';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className={classes.SignupContainer}>
      <div className={classes.SignupImage}>
        <img
          src="https://res.cloudinary.com/dvkfb7uw0/image/upload/v1614841546/epic_form/signup_fgyxpn.jpg"
          alt="signup image"
        />
      </div>
      <div className={classes.Signup}>
        <div className={classes.SpaceBlock}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo />
          </Link>
        </div>
        <div className={cx(classes.SignupDesc, classes.SpaceBlock)}>
          Get better data with conversational forms, surveys, quizzes &amp; more
        </div>
        <div className={classes.SpaceBlock}>
          <Button type="secondary">Sign in with Google</Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
