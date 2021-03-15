import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../../../redux/reducers';
import ArrowLeftSvg from '../../../svg/ArrowLeftSvg';
import UserLayout from '../../../components/UserLayoutHeader/UserLayoutHeader';
import { defaultUserData } from '../../../data/user.data';
import classes from './Create.module.css';
import CreateField from './CreateField/CreateField';
import CreatePreview from './CreatePreview/CreatePreview';
import CreateSettings from './CreateSettings/CreateSettings';
import {
  IFormField,
  SETTING_TYPE,
} from '../../../../interfaces/form/form.interface';
import {
  addQuestionField,
  updateFieldProperties,
} from '../../../../redux/actions/form.action';

function getActiveField(fieldData: IFormField[], _id: string) {
  const filteredField = fieldData.filter((val) => val._id === _id);

  if (filteredField.length === 1) {
    return filteredField[0];
  }

  return null;
}

function Create() {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [activeFieldId, setActiveFieldId] = useState<string>('');

  const dispatch = useDispatch();
  const { image, display_name } =
    useSelector((state: ApplicationState) => state.user.user) ||
    defaultUserData;

  const { formData, formSetting } = useSelector(
    (state: ApplicationState) => state.form
  );

  const activeField = getActiveField(formData.fields, activeFieldId);

  function addQuestion(type_id: SETTING_TYPE) {
    dispatch(addQuestionField(type_id));
  }

  function onSetActiveField(field_id: string) {
    setOpenSetting(true);
    setActiveFieldId(field_id);
  }

  function updateSettingProperty(
    field_id: string,
    property: keyof IFormField['properties'],
    value: string | null
  ) {
    dispatch(updateFieldProperties(field_id, property, value));
  }

  return (
    <>
      <div className={classes.CreateContainer}>
        <UserLayout profileImage={image} userName={display_name}>
          <div className={classes.CreateNavbar}>
            <div className={classes.TitleBackNav}>
              <Link to={`/dashboard/`} className={classes.EpicLogo}>
                <ArrowLeftSvg width={16} height={16} verticalAlign="middle" />
              </Link>
              <div>{formData.title}</div>
            </div>

            <div className={classes.MenuNav}>
              <ul>
                <li className={classes.active}>Create</li>
                <li>Share</li>
                <li>Results</li>
              </ul>
            </div>
          </div>
        </UserLayout>

        <div className={classes.CreateWorkContainer}>
          <CreateSettings
            open={openSetting}
            onClose={() => setOpenSetting(false)}
            formSettings={formSetting}
            activeField={activeField}
            updateSetting={updateSettingProperty}
          />
          <CreateField
            formSettings={formSetting}
            addQuestion={addQuestion}
            fieldFormData={formData.fields}
            onSetActiveField={onSetActiveField}
          />
          <CreatePreview />
        </div>
      </div>
    </>
  );
}

export default Create;
