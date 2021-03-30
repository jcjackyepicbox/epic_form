import React from 'react';
import { Link } from 'react-router-dom';
import AdminButton from '../../../../components/AdminButton/AdminButton';
import ArrowLeftSvg from '../../../../svg/ArrowLeftSvg';
import classes from './CreateNavbar.module.css';

interface IProps {
  title: string;
  onSave: () => void;
  isUnsaved: boolean;
}
function CreateNavbar({ title, onSave, isUnsaved }: IProps) {
  return (
    <div className={classes.CreateNavbar}>
      <div className={classes.TitleBackNav}>
        <Link to={`/dashboard/`} className={classes.EpicLogo}>
          <ArrowLeftSvg width={16} height={16} verticalAlign="middle" />
        </Link>
        <div>{title}</div>
      </div>

      <div className={classes.MenuNav}>
        <ul>
          <li className={classes.active}>Create</li>
          <li>Share</li>
          <li>Results</li>
        </ul>
      </div>

      <div>
        <AdminButton color="black" onClick={onSave} disabled={!isUnsaved}>
          Save
        </AdminButton>
      </div>
    </div>
  );
}

export default CreateNavbar;
