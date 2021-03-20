import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import classes from './EditableInput.module.css';

interface IProps {
  color?: 'grey';
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

function checkIfPlaceholder(
  focus: boolean,
  value: string,
  initialValue: string
) {
  return initialValue === '' && value === '' && !focus;
}

function EditableInput({ placeholder, value, onChange, color }: IProps) {
  const [focus, setFocus] = useState<boolean>(false);
  const [shiftActive, setShiftActive] = useState<boolean>(false);
  const textRef = useRef<HTMLDivElement | null>(null);
  const placeholderActive = checkIfPlaceholder(
    focus,
    textRef.current?.innerText.trim() || '',
    value
  );

  useEffect(() => {
    if (textRef.current) {
      textRef.current.innerText = value;
    }
  }, []);

  function onInputChange() {
    onChange(textRef.current?.innerText.trim() || '');
  }

  function onKeyPress(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (!shiftActive && e.key === 'Enter') {
      e.preventDefault();
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === 'Shift') {
      setShiftActive(true);
    }
    return false;
  }

  function onKeyUp(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === 'Shift') {
      setShiftActive(false);
    }
  }

  return (
    <div
      onClick={() => {
        setFocus(true);
        setTimeout(() => {
          if (textRef.current) {
            textRef.current.focus();
          }
        }, 0);
      }}
      onBlur={() => setFocus(false)}
      className={classes.EditableContainer}
    >
      {placeholderActive && (
        <span className={classes.Placeholder}>{placeholder}</span>
      )}
      <span
        ref={textRef}
        title="textbox"
        role="textbox"
        contentEditable
        className={cx(classes.EditableInput, {
          [classes.None]: placeholderActive,
          [classes.Grey]: color === 'grey',
        })}
        suppressContentEditableWarning={true}
        onInput={onInputChange}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onFocus={() => setFocus(true)}
      />
    </div>
  );
}

export default React.memo(EditableInput);
