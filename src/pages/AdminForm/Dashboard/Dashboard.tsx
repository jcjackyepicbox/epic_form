import React from 'react';
import classes from './Dashboard.module.css';
import UserLayout from '../../../components/UserLayoutHeader/UserLayoutHeader';
import { Link, Redirect, useParams } from 'react-router-dom';
import Logo from '../../../components/Logo/Logo';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../../redux/reducers';
import { defaultUserData } from '../../../data/user.data';
import WorkspacePanel from './WorkspacePanel/WorkspacePanel';
import WorkspaceForm from './WorkspaceForm/WorkspaceForm';

function Dashboard() {
  const { image, display_name, workspaces } =
    useSelector((state: ApplicationState) => state.user.user) ||
    defaultUserData;

  const { id } = useParams<{ id: string }>();

  if (!id) {
    if (workspaces.length > 0) {
      const workspaceDefaultId = workspaces[0]._id;
      return <Redirect to={`/dashboard/${workspaceDefaultId}`} />;
    }

    return (
      <Redirect
        to={`/join?error=${encodeURIComponent('Something went wrong')}`}
      />
    );
  }

  console.log(workspaces, id);
  return (
    <div className={classes.Dashboard}>
      <UserLayout profileImage={image} userName={display_name}>
        <Link to="/dashboard" className={classes.EpicLogo}>
          <Logo size="medium" />
        </Link>
      </UserLayout>
      <div className={classes.WorkspaceContainer}>
        <WorkspacePanel workspaces={workspaces} />
        <WorkspaceForm />
      </div>
    </div>
  );
}

export default Dashboard;
