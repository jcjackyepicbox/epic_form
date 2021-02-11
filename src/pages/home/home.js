import React from 'react';
import { useSelector } from 'react-redux';
import classes from './home.module.css';

function Home() {
  const todo = useSelector((state) => state.todo);
  return (
    <div className={classes.home}>
      <h3>Home page</h3>
      <p>Home page to tell all people what our website does and offers.</p>
      {todo &&
        todo.map((val) => {
          return <div key={val}>{val}</div>;
        })}
    </div>
  );
}

export default Home;
