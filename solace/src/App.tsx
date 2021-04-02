import React, { useEffect, useState } from 'react';
import classes from './App.module.css';
import PreviewForm from '@epic-form/divine';
import {
  IForm,
  IFormSetting,
} from '@epic-form/divine/dist/types/interfaces/index.interface';

interface IFetchData {
  status: boolean;
  data: {
    formData: IForm;
    formSetting: IFormSetting;
  };
}

function App(): JSX.Element {
  const [formData, setFormData] = useState<IForm | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const formId = urlParams.get('form');

    if (formId) {
      fetch('http://localhost:3001/api/public/form/60544a2ae9854fd578e05f3b')
        .then((data) => {
          return data.json();
        })
        .then((data: IFetchData) => {
          if (data.status) {
            setFormData(data.data.formData);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  if (formData === null) {
    return <div></div>;
  }

  return (
    <div className={classes.App}>
      <PreviewForm formData={formData} />
    </div>
  );
}

export default App;
