import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import ArrowLeftSvg from '../../svg/ArrowLeftSvg';

import classes from './FormNavbar.module.css';

interface IProps {
  title: string;
  children: React.ReactNode;
  activeMenu: FORM_MENU;
}

export enum FORM_MENU {
  CREATE = 'Create',
  SHARE = 'Share',
  RESULT = 'Result',
}

function FormNavbar({ title, children, activeMenu }: IProps) {
  const menuList = getMenu(activeMenu);

  const menuListElement = menuList.map((val) => {
    return (
      <Link key={val.id} to={val.route}>
        <li className={cx({ [classes.active]: val.active })} key={val.id}>
          {val.name}
        </li>
      </Link>
    );
  });

  return (
    <div className={classes.CreateNavbar}>
      <div className={classes.TitleBackNav}>
        <Link to={`/dashboard/`} className={classes.EpicLogo}>
          <ArrowLeftSvg width={16} height={16} verticalAlign="middle" />
        </Link>
        <div>{title}</div>
      </div>

      <div className={classes.MenuNav}>
        <ul>{menuListElement}</ul>
      </div>

      <div className={classes.RightNav}>{children}</div>
    </div>
  );
}

function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

function getMenu(activeMenu: FORM_MENU) {
  const menuList = [];
  for (const val of enumKeys(FORM_MENU)) {
    menuList.push({
      name: FORM_MENU[val],
      id: val,
      active: activeMenu === FORM_MENU[val],
      route: FORM_MENU[val].toLocaleLowerCase(),
    });
  }

  return menuList;
}

export default FormNavbar;
