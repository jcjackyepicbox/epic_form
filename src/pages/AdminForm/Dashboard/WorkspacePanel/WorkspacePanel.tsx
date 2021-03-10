import React from 'react';
import cx from 'classnames';
import { IWorkspace } from '../../../../../interfaces/redux/user.interface';
import IconButton from '../../../../components/IconButton/IconButton';
import PlusSvg from '../../../../svg/PlusSvg';
import classes from './WorkspacePanel.module.css';
import { Link } from 'react-router-dom';

interface IProps {
  workspaces: IWorkspace[];
  activeId: string;
  onAddClick: () => void;
}

function WorkspacePanel({ workspaces, activeId, onAddClick }: IProps) {
  const workspaceListItems = workspaces.map((val) => {
    return (
      <Link to={`/dashboard/${val._id}`} key={val._id}>
        <li
          key={val._id}
          className={cx({ [classes.active]: activeId === val._id })}
        >
          <div className={classes.ListFlex}>
            <div className={classes.TitleItem}>{val.workspace_name}</div>
            <div className={classes.CountItem}>{val.forms.length}</div>
          </div>
        </li>
      </Link>
    );
  });

  return (
    <div className={classes.WorkspacePanel}>
      <div className={classes.PanelTitle}>
        <div>Workspaces</div>
        <div className={classes.PanelTitleButton}>
          <IconButton onClick={onAddClick}>
            <PlusSvg width={16} height={16} verticalAlign="middle" />
          </IconButton>
        </div>
      </div>

      <ul className={classes.PanelList}>{workspaceListItems}</ul>
    </div>
  );
}

export default WorkspacePanel;
