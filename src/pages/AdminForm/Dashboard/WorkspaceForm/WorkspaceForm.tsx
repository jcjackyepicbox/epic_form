import React, { useState } from 'react';
import { IWorkspace } from '../../../../../interfaces/redux/user.interface';
import IconButton from '../../../../components/IconButton/IconButton';
import MoreSvg from '../../../../svg/MoreSvg';
import classes from './WorkspaceForm.module.css';

interface IProps {
  workspaceData: IWorkspace | null;
  onEdit: () => void;
}

function WorkspaceForm({ workspaceData, onEdit }: IProps) {
  const [menuActive, setMenuActive] = useState<boolean>(false);

  if (!workspaceData) {
    return null;
  }

  function toggleMenu() {
    if (menuActive) {
      setMenuActive(false);
    } else {
      setMenuActive(true);
    }
  }

  function onDefaultClick() {
    if (menuActive) {
      setMenuActive(false);
    }
  }

  const { workspace_name, is_default } = workspaceData;

  return (
    <div className={classes.WorkspaceForm} onClick={onDefaultClick}>
      <div className={classes.WorkspaceTitle}>
        <div>{workspace_name}</div>

        <div className={classes.MoreDropdown}>
          <IconButton
            customPadding="10px 6px"
            active={menuActive}
            onClick={toggleMenu}
          >
            <MoreSvg />
          </IconButton>
          {menuActive && (
            <ul className={classes.DropdownList}>
              <li onClick={onEdit}>Edit Workspace</li>
              {!is_default && (
                <li className={classes.delete}>Delete Workspace</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkspaceForm;
