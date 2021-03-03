import React from 'react';
import { useSelector } from 'react-redux';
import { ITodo } from '../../../interfaces/redux/todo.interface';
import { ApplicationState } from '../../../redux/reducers';
import Layout from '../../components/layout/layout';
import Loading from '../../components/loading/loading';
import classes from './home.module.css';

function Home() {
  const { todo, todoLoading } = useSelector((state: ApplicationState) => {
    return {
      todo: state.todoApp.todo,
      todoLoading: state.todoApp.isTodoLoading,
    };
  });

  return (
    <Layout>
      <div className={classes.home}>
        <h3>Home page</h3>
        <p>Home page to tell all people what our website does and offers.</p>
        {todoLoading && <Loading />}
        {todo &&
          todo.map((val) => {
            const { completed, title, id, userId } = val;
            return (
              <Todo
                key={id}
                completed={completed}
                title={title}
                id={id}
                userId={userId}
              />
            );
          })}
      </div>
    </Layout>
  );
}

function Todo({ completed, id, userId, title }: ITodo) {
  return (
    <div className={classes.todoItem}>
      <div className={classes.todoTitle}>{title}</div>
      <p>User id: {userId}</p>
      <p>Completed: {completed ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default Home;
