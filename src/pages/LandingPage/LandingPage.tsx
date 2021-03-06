import React from 'react';
import classes from './LandingPage.module.css';
import LandingLayout from '../../components/LandingLayout/LandingLayout';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <LandingLayout>
      <div className={classes.LandingGrid}>
        <div className={classes.GridContent}>
          <h1>The Creative Way of Building Forms</h1>
          <p>
            Tired of filling and building a boring form? <br />
            Create one that you and your audience will love at first sight.
            Build with <b>EpicForm</b>
            &nbsp;for elegant design and creative form.
          </p>
          <div className={classes.GridContentButton}>
            <Link to="/join">
              <Button type="secondary">Get Started - It's Free</Button>
            </Link>
          </div>
        </div>
        <div className={classes.GridImage}>
          <img
            src="https://res.cloudinary.com/dvkfb7uw0/image/upload/v1614833527/epic_form/Creative_Block_oagchz.png"
            alt="Epic Form Creative Block"
          />
        </div>
      </div>
    </LandingLayout>
  );
}
export default LandingPage;
