import React, { useEffect, useState } from 'react';
import classes from './App.module.css';
import PreviewForm from '@epic-form/divine';
import {
  IForm,
  IFormSetting,
} from '@epic-form/divine/dist/types/interfaces/index.interface';
import {
  IFieldAnswer,
  IResponseApi,
} from '@epic-form/divine/dist/types/helpers/preview.types';
import Loading from './components/Loading/Loading';
import NotFound from './components/NotFound/NotFound';

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
            document.title = data.data.formData.title;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  async function postSubmitAnswer(
    startTime: number,
    answer: IFieldAnswer[],
    formId: string
  ) {
    try {
      const data = await fetch('http://localhost:3001/api/public/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start_time: startTime,
          end_time: +new Date(),
          answer,
          form_id: formId,
        }),
      });

      const jsonData: IResponseApi = await data.json();

      if (jsonData.status && jsonData.data && jsonData.data.status) {
        return {
          status: true,
          message: 'Success submit response',
        };
      }

      throw new Error(jsonData.error);
    } catch (err) {
      return {
        status: false,
        message: err.message as string,
      };
    }
  }

  if (loading) {
    return (
      <div className={classes.LoadingContainer}>
        <Loading />
      </div>
    );
  }

  if (formData === null) {
    return <NotFound />;
  }

  return (
    <div className={classes.App}>
      <PreviewForm formData={formData} postSubmitAnswer={postSubmitAnswer} />
    </div>
  );
}

export default App;
