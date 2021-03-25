import React from 'react';
import cx from 'classnames';
import classes from './Dropdown.module.css';

/**
 * @description Provide dropdown styles and layout effect
 * important: use <li> semantic inside dropdownlist
 */
function DropdownList({
  children,
  toRight,
}: {
  children: React.ReactNode;
  toRight?: boolean;
}) {
  return (
    <ul className={cx(classes.DropdownList, { [classes.ToRight]: toRight })}>
      {children}
    </ul>
  );
}

function DropdownContainer({ children }: { children: React.ReactNode }) {
  return <div className={classes.DropdownContainer}>{children}</div>;
}

export default {
  DropdownContainer,
  DropdownList,
};
