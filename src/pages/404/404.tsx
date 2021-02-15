import React from 'react';
import { Route } from 'react-router-dom';

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
    <Status code={404}>
      <div>
        <h1>Sorry, can’t find that.</h1>
      </div>
    </Status>
  );
}

export default NotFound;
