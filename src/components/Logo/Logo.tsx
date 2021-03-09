import React from 'react';
import cx from 'classnames';
import classes from './Logo.module.css';

interface IProps {
  size: 'small' | 'medium' | 'large';
}

function Logo({ size }: IProps) {
  return (
    <div
      className={cx(classes.Logo, {
        [classes.medium]: size === 'medium',
        [classes.small]: size === 'small',
      })}
    >
      EpicForm
    </div>
  );
}

export default Logo;
