import PreviewForm from '@epic-form/divine';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ApplicationState } from '../../../../redux/reducers';
import AdminButton from '../../../components/AdminButton/AdminButton';
import FormNavbar, {
  FORM_MENU,
} from '../../../components/FormNavbar/FormNavbar';
import ModalFullPage from '../../../components/ModalFullPage/ModalFullPage';
import UserLayout from '../../../components/UserLayoutHeader/UserLayoutHeader';
import { defaultUserData } from '../../../data/user.data';
import ViewSvg from '../../../svg/ViewSvg';
import classes from './Result.module.css';

function Result() {
  const { image, display_name } =
    useSelector((state: ApplicationState) => state.user.user) ||
    defaultUserData;
  const { formData } = useSelector((state: ApplicationState) => state.form);
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  return (
    <>
      {openPreview && (
        <ModalFullPage
          title="Current Draft Preview"
          onClose={() => setOpenPreview(false)}
        >
          <PreviewForm formData={formData} isDevelopment={true} />
        </ModalFullPage>
      )}
      <div className={classes.ResultPageContainer}>
        <UserLayout profileImage={image} userName={display_name}>
          <FormNavbar title={formData.title} activeMenu={FORM_MENU.RESULT}>
            <AdminButton color="greywhite" onClick={() => setOpenPreview(true)}>
              <ViewSvg
                color="rgb(38, 38, 39)"
                height={14}
                width={14}
                verticalAlign="middle"
              />
              <span className={classes.ViewButtonText}>View</span>
            </AdminButton>
          </FormNavbar>
        </UserLayout>
        <div className={classes.ResultContent}>
          <div className={classes.ResultWidget}>
            <div className={classes.ResultWidgetTitle}>Response Insights</div>

            <div className={classes.DeviceGroup}>All Devices</div>
            <div className={classes.WidgetFlex}>
              <div className={classes.InsightsContainer}>
                <div className={classes.InsightsTitle}>Responses</div>
                <div className={classes.InsightsValue}>8</div>
              </div>
              <div className={classes.InsightsContainer}>
                <div className={classes.InsightsTitle}>
                  Average time to complete
                </div>
                <div className={classes.InsightsValue}>00:13</div>
              </div>
            </div>
          </div>

          <div className={classes.ResultWidget}>
            <div className={classes.ResultWidgetTitle}>Response Summary</div>

            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;
