import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import classes from './EditableChoiceInput.module.css';
import { getNewChoiceFormField } from '../../data/form.data';
import { IChoiceForm } from '../../../interfaces/form/form.interface';

interface IChoice {
  _id: string;
  label: string;
}

interface IProps {
  choiceValue: IChoice[];
  onChange: (choice_id: string, label: string) => void;
  onAddChoice: (new_choice: IChoiceForm) => void;
}

function checkIfPlaceholder(
  focus: boolean,
  value: string,
  initialValue: string
) {
  return initialValue === '' && value === '' && !focus;
}

function EditableChoiceInput({ choiceValue, onChange, onAddChoice }: IProps) {
  const [activeFocus, setActiveFocus] = useState<string | null>(null);
  const [getRef, setRef] = useDynamicRefs();

  function onActiveClick(id: string) {
    setActiveFocus(id);
    setTimeout(() => {
      const currRef = getRef(id);
      if (currRef && currRef.current) {
        currRef.current.focus();
      }
    }, 0);
  }

  useEffect(() => {
    choiceValue.forEach((val) => {
      const currRef = getRef(val._id);
      if (currRef && currRef.current) {
        currRef.current.innerText = val.label;
      }
    });
  }, []);

  function onKeyPress(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === 'Enter') {
      const newFormField = getNewChoiceFormField();
      onAddChoice(newFormField);
      e.preventDefault();
    }
  }

  function onInputChange(id: string) {
    const currRef = getRef(id);
    onChange(id, currRef.current?.innerText.trim() || '');
  }

  const inputChoices = choiceValue.map((val) => {
    const currRef = getRef(val._id);
    const placeholderActive = checkIfPlaceholder(
      activeFocus === val._id,
      currRef?.current?.innerText.trim() || '',
      val.label
    );

    return (
      <div
        key={val._id}
        onClick={() => onActiveClick(val._id)}
        onBlur={() => setActiveFocus(null)}
        className={classes.EditableContainer}
      >
        <span className={classes.EditableListStyle}>-</span>
        {placeholderActive && (
          <span className={classes.Placeholder}>choice</span>
        )}
        <span
          ref={setRef(val._id)}
          title="textbox"
          role="textbox"
          contentEditable
          className={cx(classes.EditableInput, {
            [classes.None]: placeholderActive,
          })}
          suppressContentEditableWarning={true}
          onInput={() => onInputChange(val._id)}
          onKeyPress={onKeyPress}
          onKeyDown={() => false}
          // onKeyUp={onKeyUp}
        />
      </div>
    );
  });

  return <div>{inputChoices}</div>;
}

function useDynamicRefs(): [
  (key: string) => React.RefObject<HTMLSpanElement>,
  (key: string) => React.RefObject<HTMLSpanElement>
] {
  const map = useRef(new Map<string, React.RefObject<HTMLSpanElement>>());

  function setRef(key: string): React.RefObject<HTMLSpanElement> {
    const ref = React.createRef<HTMLSpanElement>();
    map.current.set(key, ref);
    return ref;
  }

  function getRef(key: string): React.RefObject<HTMLSpanElement> {
    return map.current.get(key) as React.RefObject<HTMLSpanElement>;
  }

  return [getRef, setRef];
}

export default React.memo(EditableChoiceInput);
