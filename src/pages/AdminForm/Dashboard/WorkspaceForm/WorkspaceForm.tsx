import React, { useState } from 'react';
import { IWorkspace } from '../../../../../interfaces/redux/user.interface';
import IconButton from '../../../../components/IconButton/IconButton';
import MoreSvg from '../../../../svg/MoreSvg';
import PlusSvg from '../../../../svg/PlusSvg';
import classes from './WorkspaceForm.module.css';

interface IProps {
  workspaceData: IWorkspace | null;
  onEdit: () => void;
  onDelete: () => void;
}

function WorkspaceForm({ workspaceData, onEdit, onDelete }: IProps) {
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
                <li className={classes.delete} onClick={onDelete}>
                  Delete Workspace
                </li>
              )}
            </ul>
          )}
        </div>
      </div>

      <div className={classes.WorkspaceDescription}>
        My Personal Workspace of surveys, including personal development,
        self-perseverance, and people behavioural insights.
      </div>

      <div className={classes.FormsContainer}>
        <div className={classes.FormsItem}>
          <div className={classes.NewForm}>
            <div className={classes.NewFormTitle}>New epicform</div>
            <div className={classes.NewFormIcon}>
              <PlusSvg color="#fff" width={32} height={32} />
            </div>
          </div>
        </div>

        <div className={classes.FormsItem}>
          <div className={classes.EmptyForm} />
        </div>
      </div>
    </div>
  );
}

export default WorkspaceForm;
