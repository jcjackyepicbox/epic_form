import React from 'react';
import cx from 'classnames';
import classes from './Button.module.css';

interface IProps {
  children: React.ReactNode;
  type: 'primary' | 'secondary' | 'outline';
  icon?: JSX.Element;
}

/**
 * Button for Landing Page
 */
function Button({ children, type, icon }: IProps) {
  return (
    <button
      role="button"
      className={cx(classes.Button, {
        [classes.Secondary]: type === 'secondary',
        [classes.Outline]: type === 'outline',
      })}
    >
      {icon}
      {children}
    </button>
  );
}

export default Button;
