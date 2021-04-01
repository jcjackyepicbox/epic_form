import React from 'react';
import classes from './App.module.css';
import PreviewForm from '@epic-form/divine';

function App(): JSX.Element {
  const formData = {
    _id: '60544a2ae9854fd578e05f3b',
    title: 'New Form',
    purpose: 'csacsa',
    fields: [
      {
        _id: 'd3489d9d-1548-4302-9b8f-b4de0e788080',
        properties: {
          button_text: 'Start',
          description:
            "Hello, we're currently conducting research regarding personality behaviour and its detailed information on how it affects analytical thinking and leadership abilities.",
          choices: [
            {
              _id: '570d6302-527a-4082-8698-a060751e2e11',
              label: '',
            },
          ],
        },
        title: 'Personality Behaviour Survey',
        type_id: 'welcome_screen',
      },
      {
        _id: '27f896a7-4e1b-4614-a5a3-455e38b14956',
        properties: {
          button_text: null,
          description: "We'd like to know who you are 😁",
          choices: [
            {
              _id: '9a2d0ac9-23d1-489c-988c-dd9a5dbb5146',
              label: '',
            },
          ],
        },
        title: 'What is your name?',
        type_id: 'short_text',
      },
      {
        _id: '4b78a85b-7e29-47ce-b130-dcdec3f87440',
        properties: {
          button_text: null,
          description: 'For fun only 😁',
          choices: [
            {
              _id: 'fe633f16-efea-461d-8608-2f73f0fa57b1',
              label: '',
            },
          ],
        },
        title: 'Are you single?',
        type_id: 'yes_no',
      },
      {
        _id: '51ec4727-4970-428b-a479-c4ebf6dfc0f9',
        properties: {
          button_text: null,
          description:
            "We'd very happy to delight you in food when you come over",
          choices: [
            {
              _id: 'e31a7d4e-3865-4fae-8f2d-8063db14f7e9',
              label: 'Fried Chicken',
            },
            {
              _id: 'ad859f57-d0c9-4ccf-aaa4-8310200d8a08',
              label: 'Fried Rice',
            },
            {
              _id: '25546fa9-4bfb-4da7-bd18-c7309840fa48',
              label: 'Noodles',
            },
          ],
        },
        title: 'What is your favourite food?',
        type_id: 'multiple_choice',
      },
      {
        _id: 'e5248613-9f7f-4028-b780-3162ed0ec457',
        properties: {
          button_text: 'See you!',
          description: 'We really appreciate your time and efforts',
          choices: [
            {
              _id: '8924c95b-3090-459d-b8f0-9bd347a11ea4',
              label: '',
            },
          ],
        },
        title: 'Thank You!',
        type_id: 'thankyou_screen',
      },
    ],
  };

  return (
    <div className={classes.App}>
      <PreviewForm formData={formData} />
    </div>
  );
}

export default App;
