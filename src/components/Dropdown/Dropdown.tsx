import React from 'react';
import classes from './Dropdown.module.css';

/**
 * @description Provide dropdown styles and layout effect
 * important: use <li> semantic inside dropdownlist
 */
function DropdownList({ children }: { children: React.ReactNode }) {
  return <ul className={classes.DropdownList}>{children}</ul>;
}

function DropdownContainer({ children }: { children: React.ReactNode }) {
  return <div className={classes.DropdownContainer}>{children}</div>;
}

export default {
  DropdownContainer,
  DropdownList,
};
