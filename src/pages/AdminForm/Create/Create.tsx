import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../../redux/reducers';
import UserLayout from '../../../components/UserLayoutHeader/UserLayoutHeader';
import { defaultUserData } from '../../../data/user.data';
import classes from './Create.module.css';
import CreateField from './CreateField/CreateField';
import CreatePreview from './CreatePreview/CreatePreview';
import CreateSettings from './CreateSettings/CreateSettings';
import { IFormField } from '../../../../interfaces/form/form.interface';
import CreateNavbar from './CreateNavbar/CreateNavbar';
import { updateFormField } from '../../../service/form.service';

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

  const { image, display_name } =
    useSelector((state: ApplicationState) => state.user.user) ||
    defaultUserData;

  const { formData, formSetting } = useSelector(
    (state: ApplicationState) => state.form
  );

  const activeField = getActiveField(formData.fields, activeFieldId);

  function onSetActiveField(field_id: string) {
    if (field_id === '') {
      setOpenSetting(false);
    } else {
      setOpenSetting(true);
    }
    setActiveFieldId(field_id);
  }

  function saveFormField() {
    updateFormField(formData._id, formData.fields).then((data) => {
      if (data.status && data.data && data.data.status) {
        console.log('saved');
        // TODO: update toast
      }
    });
  }

  return (
    <>
      <div className={classes.CreateContainer}>
        <UserLayout profileImage={image} userName={display_name}>
          <CreateNavbar title={formData.title} onSave={saveFormField} />
        </UserLayout>

        <div className={classes.CreateWorkContainer}>
          <CreateSettings
            open={openSetting}
            onClose={() => setOpenSetting(false)}
            formSettings={formSetting}
            activeField={activeField}
          />
          <CreateField
            activeFieldId={activeFieldId}
            formSettings={formSetting}
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
