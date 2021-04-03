import React from 'react';
import Logo from '../../components/Logo/Logo';
import classes from './Join.module.css';
import cx from 'classnames';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import GoogleSvg from '../../svg/GoogleSvg';

function Join() {
  return (
    <div className={classes.SignupContainer}>
      <div className={classes.SignupImage}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo size="large" />
        </Link>
        <img
          src="https://res.cloudinary.com/dvkfb7uw0/image/upload/v1614841546/epic_form/signup_fgyxpn.jpg"
          alt="signup image"
        />
      </div>
      <div className={classes.Signup}>
        <div className={classes.SignupContent}>
          <h1>Join Us</h1>
          <div className={cx(classes.SignupDesc, classes.SpaceBlock)}>
            Get better data with conversational forms, surveys, quizzes &amp;
            more. <br />
            The best part of <b>EpicForm</b> is it will always be <b>FREE</b>
          </div>

          <div className={classes.SpaceBlock}>
            <a href="http://localhost:3001/auth/google">
              <Button
                type="outline"
                icon={<GoogleSvg verticalAlign="middle" />}
              >
                <span>Sign up with Google</span>
              </Button>
            </a>
          </div>
          <div className={classes.SpaceBlock} />
          <div className={classes.SpaceBlock}>
            <p>
              By using EpicForm, you agree to our Code of Conduct, Privacy
              Statement, and Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
