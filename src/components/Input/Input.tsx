import React from 'react';
import classes from './Input.module.css';

function Input(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return <input type="text" className={classes.Input} {...props} />;
}

export default Input;
