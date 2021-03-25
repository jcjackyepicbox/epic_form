import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../../redux/reducers';
import UserLayout from '../../../components/UserLayoutHeader/UserLayoutHeader';
import { defaultUserData } from '../../../data/user.data';
import classes from './Create.module.css';
import CreateField from './CreateField/CreateField';
import CreatePreview from './CreatePreview/CreatePreview';
import CreateSettings from './CreateSettings/CreateSettings';
import { IForm, IFormField } from '../../../../interfaces/form/form.interface';
import CreateNavbar from './CreateNavbar/CreateNavbar';
import { updateFormField } from '../../../service/form.service';
import { deepEqual } from '../../../utils/deepEqual';
import { Prompt, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';

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
  const [initialFormData, setInitialFormData] = useState<IForm | null>(null);

  const { image, display_name } =
    useSelector((state: ApplicationState) => state.user.user) ||
    defaultUserData;

  const { formData, formSetting, loading } = useSelector(
    (state: ApplicationState) => state.form
  );
  const { id } = useParams<{ id: string }>();
  const activeField = getActiveField(formData.fields, activeFieldId);
  const isUnsaved = useMemo(() => {
    if (initialFormData === null && formData._id === id) {
      setInitialFormData(formData);
      return false;
    }

    if (formData && initialFormData && !deepEqual(formData, initialFormData)) {
      return true;
    }

    return false;
  }, [formData, initialFormData]);

  useEffect(() => {
    function listener(e: BeforeUnloadEvent) {
      if (isUnsaved) {
        e.preventDefault();
        const dialogText =
          'You have unsaved work. Are you sure want to leave this page?';
        e.returnValue = dialogText;
        return dialogText;
      }
    }

    window.addEventListener('beforeunload', listener);

    return () => {
      window.removeEventListener('beforeunload', listener);
    };
  }, [isUnsaved]);

  function onSetActiveField(field_id: string) {
    if (field_id === '') {
      setOpenSetting(false);
    } else {
      setOpenSetting(true);
    }
    setActiveFieldId(field_id);
  }

  function saveFormField() {
    if (isUnsaved) {
      updateFormField(formData._id, formData.fields).then((data) => {
        if (data.status && data.data && data.data.status) {
          // TODO: update toast
          setInitialFormData(formData);
        }
      });
    }
  }

  return (
    <>
      <Prompt
        when={isUnsaved}
        message="You have unsaved work. Are you sure you want to leave?"
      />
      <div className={classes.CreateContainer}>
        <UserLayout profileImage={image} userName={display_name}>
          <CreateNavbar
            title={formData.title}
            onSave={saveFormField}
            isUnsaved={isUnsaved}
          />
        </UserLayout>
        {loading ? (
          <Loading />
        ) : (
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
            <CreatePreview activeField={activeField} formData={formData} />
          </div>
        )}
      </div>
    </>
  );
}

export default Create;
