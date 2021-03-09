import React from 'react';
import { IWorkspace } from '../../../../../interfaces/redux/user.interface';
import IconButton from '../../../../components/IconButton/IconButton';
import PlusSvg from '../../../../svg/PlusSvg';
import classes from './WorkspacePanel.module.css';

interface IProps {
  workspaces: IWorkspace[];
}

function WorkspacePanel({ workspaces }: IProps) {
  const workspaceListItems = workspaces.map((val) => {
    return (
      <li key={val._id}>
        <div className={classes.ListFlex}>
          <div className={classes.TitleItem}>{val.workspace_name}</div>
          <div className={classes.CountItem}>{val.forms.length}</div>
        </div>
      </li>
    );
  });

  return (
    <div className={classes.WorkspacePanel}>
      <div className={classes.PanelTitle}>
        <div>Workspaces</div>
        <div className={classes.PanelTitleButton}>
          <IconButton>
            <PlusSvg width={16} height={16} verticalAlign="middle" />
          </IconButton>
        </div>
      </div>

      <ul className={classes.PanelList}>{workspaceListItems}</ul>
    </div>
  );
}

export default WorkspacePanel;
