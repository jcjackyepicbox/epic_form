import React from 'react';
import Layout from '../../components/layout/layout';
import classes from './about.module.css';

function About() {
  return (
    <Layout>
      <div className={classes.about}>
        <h3>About page</h3>
        <p>About page to tell who are the creator of this websites.</p>
      </div>
    </Layout>
  );
}

export default About;
