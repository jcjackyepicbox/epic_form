import React from 'react';
import classes from './AdminButton.module.css';
import cx from 'classnames';
interface IProps {
  children: React.ReactNode;
  disabled?: boolean;
  color: 'grey' | 'teal';
  onClick?: () => void;
}

function AdminButton({ children, disabled, color, onClick }: IProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cx(classes.AdminButton, {
        [classes.disabled]: disabled === true,
        [classes.grey]: color === 'grey',
        [classes.teal]: color === 'teal',
      })}
    >
      {children}
    </button>
  );
}

export default AdminButton;
