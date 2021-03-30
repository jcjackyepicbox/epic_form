import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../../components/LandingLayout/LandingLayout';
import classes from './404.module.css';
interface IProps {
  code: number;
  children: React.ReactNode | React.ReactChild;
}

function Status({ code, children }: IProps) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.statusCode = code;
        }
        return children;
      }}
    />
  );
}

function NotFound() {
  return (
    <Layout>
      <Status code={404}>
        <div className={classes.NotFound}>
          <img
            src="https://res.cloudinary.com/dvkfb7uw0/image/upload/v1614840692/epic_form/Upgrading_x94e3q.png"
            alt="Page Not found"
          />
          <h1>Sorry, can’t find that.</h1>
        </div>
      </Status>
    </Layout>
  );
}

export default NotFound;
