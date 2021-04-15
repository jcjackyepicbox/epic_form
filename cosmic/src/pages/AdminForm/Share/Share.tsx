import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ApplicationState } from '../../../../redux/reducers';
import FormNavbar, {
  FORM_MENU,
} from '../../../components/FormNavbar/FormNavbar';
import UserLayout from '../../../components/UserLayoutHeader/UserLayoutHeader';
import { defaultUserData } from '../../../data/user.data';

function Share() {
  const { image, display_name } =
    useSelector((state: ApplicationState) => state.user.user) ||
    defaultUserData;

  return (
    <UserLayout profileImage={image} userName={display_name}>
      <FormNavbar title="Halohalo" activeMenu={FORM_MENU.SHARE}>
        <div>Hai</div>
      </FormNavbar>
    </UserLayout>
  );
}

export default Share;
