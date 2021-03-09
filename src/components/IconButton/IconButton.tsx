import React from 'react';
import classes from './IconButton.module.css';

interface IProps {
  children: React.ReactNode;
  onClick?: () => void;
}

function IconButton({ children, onClick }: IProps) {
  return (
    <button className={classes.IconButton} onClick={onClick}>
      {children}
    </button>
  );
}

export default IconButton;
