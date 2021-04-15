import React from 'react';
import classes from './IconButton.module.css';
import cx from 'classnames';
interface IProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  customPadding?: string;
  active?: boolean;
}

function IconButton({ children, onClick, customPadding, active }: IProps) {
  return (
    <button
      className={cx(classes.IconButton, {
        [classes.active]: active === true,
      })}
      onClick={onClick}
      style={{ padding: customPadding || '4px' }}
    >
      {children}
    </button>
  );
}

export default IconButton;
