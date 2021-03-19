import React from 'react';
import classes from './Loading.module.css';

function Loading() {
  return (
    <div className={classes.LoadingContainer}>
      <div className={classes.RippleLoading}>
        <div></div>
        <div></div>
      </div>
      <div>Hang on! We're setting up the workspace</div>
    </div>
  );
}

export default Loading;
