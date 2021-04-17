import React from 'react';
import classes from './AdminButton.module.css';
import cx from 'classnames';
interface IProps {
  children: React.ReactNode;
  disabled?: boolean;
  color: 'grey' | 'teal' | 'red' | 'black' | 'greywhite';
  borderLess?: boolean;
  onClick?: () => void;
}

function AdminButton({
  children,
  disabled,
  color,
  onClick,
  borderLess,
}: IProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cx(classes.AdminButton, {
        [classes.disabled]: disabled === true,
        [classes.grey]: color === 'grey',
        [classes.greywhite]: color === 'greywhite',
        [classes.teal]: color === 'teal',
        [classes.red]: color === 'red',
        [classes.black]: color === 'black',
        [classes.borderLess]: borderLess,
      })}
    >
      {children}
    </button>
  );
}

export default AdminButton;
