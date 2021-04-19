import React from 'react';
import { IFormField } from '../../../../../../interfaces/form/form.interface';
import { IFieldAnswer } from '../../../../../../interfaces/redux/form.interface';
import classes from './ChoiceSummary.module.css';

interface IProps {
  answerField: IFieldAnswer[];
  formField: IFormField;
  validAnswer: number;
}

function ChoiceSummary({ answerField, formField, validAnswer }: IProps) {
  const choiceGridElement = formField.properties.choices.map((val) => {
    const chosenLen = answerField.filter(
      (ansVal) => ansVal.choices?.choice_id === val._id
    ).length;

    const pctAmount = (chosenLen / validAnswer) * 100;

    return (
      <React.Fragment key={val._id}>
        <div>{pctAmount.toFixed(2)} %</div>
        <div className={classes.ChoiceChartBar}>
          <div
            className={classes.ChoiceFillBar}
            style={{ width: `${pctAmount}%` }}
          />
          <div className={classes.ChoiceAbsoluteBar}>
            <div className={classes.ResponseLabel}>{val.label}</div>
            <div className={classes.ResponseAmount}>
              <span>{chosenLen}</span>&nbsp; responses
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  });

  return <div className={classes.ChoiceSummary}>{choiceGridElement}</div>;
}

export default ChoiceSummary;
