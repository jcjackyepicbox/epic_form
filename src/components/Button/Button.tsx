import React from 'react';
import cx from 'classnames';
import classes from './Button.module.css';

interface IProps {
  children: React.ReactNode;
  type: 'primary' | 'secondary';
}

function Button({ children, type }: IProps) {
  return (
    <button
      role="button"
      className={cx(classes.Button, {
        [classes.Secondary]: type === 'secondary',
      })}
    >
      {children}
    </button>
  );
}

export default Button;
