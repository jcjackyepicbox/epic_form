import React, { useEffect, useRef, useState } from 'react';
import { IWorkspace } from '../../../../../interfaces/redux/user.interface';
import IconButton from '../../../../components/IconButton/IconButton';
import MoreSvg from '../../../../svg/MoreSvg';
import PlusSvg from '../../../../svg/PlusSvg';
import classes from './WorkspaceForm.module.css';
import { getFormsWorkspace } from '../../../../service/form.service';
import { IForm } from '../../../../../interfaces/form/form.interface';
import { Link, Redirect } from 'react-router-dom';
import Dropdown from '../../../../components/Dropdown/Dropdown';
interface IProps {
  workspaceData: IWorkspace | null;
  onEdit: () => void;
  onDelete: () => void;
  onOpenFormModal: () => void;
}

function WorkspaceForm({
  workspaceData,
  onEdit,
  onDelete,
  onOpenFormModal,
}: IProps) {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const { formsData } = useFormData(workspaceData);
  const [redirect, setRedirect] = useState<string>('');

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

  function onWorkspaceClick(_id: string) {
    setRedirect(`/forms/${_id}/create`);
  }

  const { workspace_name, is_default } = workspaceData;

  const formsList = formsData.map((val) => {
    const { title, _id, responses } = val;
    return (
      <div
        className={classes.FormsItem}
        key={_id}
        onClick={() => onWorkspaceClick(_id)}
      >
        <div className={classes.RegularForm}>
          <div className={classes.RegularTitle}>{title}</div>
          <div className={classes.RegularBottom}>
            <div className={classes.RegularResponses}>
              {responses.length} responses
            </div>
            <IconButton
              customPadding="10px 6px"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <MoreSvg />
            </IconButton>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={classes.WorkspaceForm} onClick={onDefaultClick}>
      {redirect !== '' && <Redirect to={redirect} />}
      <div className={classes.WorkspaceTitle}>
        <div>{workspace_name}</div>

        <Dropdown.DropdownContainer>
          <IconButton
            customPadding="10px 6px"
            active={menuActive}
            onClick={toggleMenu}
          >
            <MoreSvg />
          </IconButton>
          {menuActive && (
            <Dropdown.DropdownList>
              <li onClick={onEdit}>Edit Workspace</li>
              {!is_default && (
                <li className={classes.delete} onClick={onDelete}>
                  Delete Workspace
                </li>
              )}
            </Dropdown.DropdownList>
          )}
        </Dropdown.DropdownContainer>
      </div>

      <div className={classes.WorkspaceDescription}>
        My Personal Workspace of surveys, including personal development,
        self-perseverance, and people behavioural insights.
      </div>

      <div className={classes.FormsContainer}>
        <div className={classes.FormsItem}>
          <div
            className={classes.NewForm}
            role="button"
            onClick={onOpenFormModal}
          >
            <div className={classes.NewFormTitle}>New epicform</div>
            <div className={classes.NewFormIcon}>
              <PlusSvg color="#fff" width={32} height={32} />
            </div>
          </div>
        </div>

        {formsList}

        <div className={classes.FormsItem}>
          <div className={classes.EmptyForm} />
        </div>
      </div>
    </div>
  );
}

function isArrayEqual(a: string[], b: string[]) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

function useFormData(workspaceData: IWorkspace | null) {
  const [loading, setLoading] = useState<boolean>(true);
  const [formsData, setFormsData] = useState<IForm[]>([]);
  const prevFormIds = useRef<string[]>([]);

  useEffect(() => {
    if (
      workspaceData &&
      workspaceData.forms.length > 0 &&
      !isArrayEqual(prevFormIds.current, workspaceData.forms)
    ) {
      setLoading(true);
      getFormsWorkspace(workspaceData.forms)
        .then((data) => {
          if (data.status) {
            setFormsData(data.data);
          } else {
            setFormsData([]);
          }
        })
        .catch((err) => {
          console.error(err);
          setFormsData([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (
      !workspaceData ||
      (workspaceData && workspaceData.forms.length === 0)
    ) {
      setFormsData([]);
    }
    prevFormIds.current = workspaceData
      ? workspaceData.forms
      : prevFormIds.current;
  }, [workspaceData]);

  return {
    loading,
    formsData,
  };
}

export default WorkspaceForm;
