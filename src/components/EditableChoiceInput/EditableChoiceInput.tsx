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
  onDeleteChoice: (choice_id: string) => void;
}

function checkIfPlaceholder(
  focus: boolean,
  value: string,
  initialValue: string
) {
  return initialValue === '' && value === '' && !focus;
}

function EditableChoiceInput({
  choiceValue,
  onChange,
  onAddChoice,
  onDeleteChoice,
}: IProps) {
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
      if (choiceValue[choiceValue.length - 1].label !== '') {
        const newFormField = getNewChoiceFormField();
        onAddChoice(newFormField);
      }
      e.preventDefault();
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLSpanElement>, id: string) {
    if (e.key === 'Backspace' && choiceValue.length !== 1) {
      const currRef = getRef(id);
      const currText = currRef.current?.innerText;
      if (currText === '') {
        onDeleteChoice(id);
      }
    }

    return false;
  }

  function onInputChange(id: string) {
    const currRef = getRef(id);
    onChange(id, currRef.current?.innerText.trim() || '');
  }

  const inputChoices = choiceValue.map((val) => {
    const { _id, label } = val;
    const currRef = getRef(_id);
    const placeholderActive = checkIfPlaceholder(
      activeFocus === _id,
      currRef?.current?.innerText.trim() || '',
      label
    );

    return (
      <div
        key={val._id}
        onClick={() => onActiveClick(_id)}
        onBlur={() => setActiveFocus(null)}
        className={classes.EditableContainer}
      >
        <span className={classes.EditableListStyle}>-</span>
        {placeholderActive && (
          <span className={classes.Placeholder}>choice</span>
        )}
        <span
          ref={setRef(_id)}
          title="textbox"
          role="textbox"
          contentEditable
          className={cx(classes.EditableInput, {
            [classes.None]: placeholderActive,
          })}
          suppressContentEditableWarning={true}
          onInput={() => onInputChange(_id)}
          onKeyPress={onKeyPress}
          onKeyDown={(e) => onKeyDown(e, _id)}
          onFocus={() => onActiveClick(_id)}
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
