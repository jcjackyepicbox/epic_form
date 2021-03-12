import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ApplicationState } from '../../../../redux/reducers';
import Logo from '../../../components/Logo/Logo';
import UserLayout from '../../../components/UserLayoutHeader/UserLayoutHeader';
import { defaultUserData } from '../../../data/user.data';
import classes from './Create.module.css';

function Create() {
  const { image, display_name, workspaces } =
    useSelector((state: ApplicationState) => state.user.user) ||
    defaultUserData;

  const formData = useSelector(
    (state: ApplicationState) => state.form.formData
  );

  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <UserLayout profileImage={image} userName={display_name}>
        <Link
          to={`/dashboard/${workspaces[0]._id}`}
          className={classes.EpicLogo}
        >
          <Logo size="medium" />
        </Link>
      </UserLayout>
      <div>Create</div>
      <div>{id}</div>
      <pre>{JSON.stringify(formData)}</pre>
    </div>
  );
}

export default Create;
