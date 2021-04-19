import PreviewForm from '@epic-form/divine';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  IFormField,
  IFormSetting,
  SETTING_TYPE,
} from '../../../../interfaces/form/form.interface';
import { IFormResponse } from '../../../../interfaces/redux/form.interface';
import { ApplicationState } from '../../../../redux/reducers';
import AdminButton from '../../../components/AdminButton/AdminButton';
import FormNavbar, {
  FORM_MENU,
} from '../../../components/FormNavbar/FormNavbar';
import ModalFullPage from '../../../components/ModalFullPage/ModalFullPage';
import UserLayout from '../../../components/UserLayoutHeader/UserLayoutHeader';
import { defaultUserData } from '../../../data/user.data';
import ViewSvg from '../../../svg/ViewSvg';
import ResponseSummary from './ResponseSummary/ResponseSummary';
import classes from './Result.module.css';

function calculateAverageTime(formResponse: IFormResponse[]) {
  const totalConsumedTime = formResponse.reduce((a, b) => {
    return a + b.end_time - b.start_time;
  }, 0);

  const avgTime = Math.floor(totalConsumedTime / formResponse.length / 1000);

  const minutes = Math.floor(avgTime / 60);
  const seconds = avgTime % 60;

  return {
    minutes: minutes > 9 ? minutes.toString() : `0${minutes}`,
    seconds: seconds > 9 ? seconds.toString() : `0${seconds}`,
  };
}

function Result() {
  const { image, display_name } =
    useSelector((state: ApplicationState) => state.user.user) ||
    defaultUserData;
  const {
    formData,
    formSetting,
    formResponse,
    formResponseByField,
  } = useSelector((state: ApplicationState) => state.form);
  const [openPreview, setOpenPreview] = useState<boolean>(false);

  const filterFields = useMemo(
    () =>
      formData.fields.filter(
        (val) =>
          val.type_id !== SETTING_TYPE.welcome_screen &&
          val.type_id !== SETTING_TYPE.thankyou_screen
      ),
    [formData.fields]
  );

  const { minutes, seconds } = calculateAverageTime(formResponse);

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
                <div className={classes.InsightsValue}>
                  {formResponse.length}
                </div>
              </div>
              <div className={classes.InsightsContainer}>
                <div className={classes.InsightsTitle}>
                  Average time to complete
                </div>
                <div className={classes.InsightsValue}>
                  {minutes}:{seconds}
                </div>
              </div>
            </div>
          </div>
          <div className={classes.ResultWidget}>
            <div className={classes.ResultWidgetTitle}>Response Summary</div>

            <ResponseSummary
              formFields={filterFields}
              formSettings={formSetting}
              formResponseByField={formResponseByField}
              totalResponse={formResponse.length}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;
