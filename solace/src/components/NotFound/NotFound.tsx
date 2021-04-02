import React from 'react';
import classes from './NotFound.module.css';

function NotFound() {
  return (
    <div className={classes.NotFound}>
      <img
        src="https://res.cloudinary.com/dvkfb7uw0/image/upload/v1617358709/epic_form/Saly-10_1_hwohjg.png"
        alt="Form not found"
      />
      <div className={classes.NotFoundTitle}>
        Sorry, We cannot find your form
      </div>
      <div className={classes.NotFoundDesc}>
        We cannot process your requested form. Please check if you're at
        corrected link and please try again.
      </div>

      <button className={classes.NotFoundButton}>Go to epicform</button>
    </div>
  );
}

export default NotFound;
