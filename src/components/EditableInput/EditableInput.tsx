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
  const textRef = useRef<HTMLDivElement | null>(null);
  const placeholderActive = checkIfPlaceholder(
    focus,
    textRef.current?.innerHTML.trim() || '',
    value
  );

  useEffect(() => {
    if (textRef.current) {
      textRef.current.innerHTML = value;
    }
  }, []);

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
        contentEditable={focus}
        className={cx(classes.EditableInput, {
          [classes.None]: placeholderActive,
          [classes.Grey]: color === 'grey',
        })}
        suppressContentEditableWarning={true}
        onInput={() => onChange(textRef.current?.innerHTML.trim() || '')}
        onKeyDown={() => {
          return false;
        }}
      >
        {value}&#65279;
      </span>
    </div>
  );
}

export default EditableInput;
