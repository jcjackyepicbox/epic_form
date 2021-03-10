import React, { useState } from 'react';
import classes from './Dashboard.module.css';
import UserLayout from '../../../components/UserLayoutHeader/UserLayoutHeader';
import { Link, Redirect, useParams } from 'react-router-dom';
import Logo from '../../../components/Logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../redux/reducers';
import { defaultUserData } from '../../../data/user.data';
import WorkspacePanel from './WorkspacePanel/WorkspacePanel';
import WorkspaceForm from './WorkspaceForm/WorkspaceForm';
import { IWorkspace } from '../../../../interfaces/redux/user.interface';
import WorkspaceModal from './WorkspaceModal/WorkspaceModal';
import {
  createNewWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from '../../../service/user.service';
import { getUserWorkspace } from '../../../../redux/actions/user.action';
import ConfirmModal from '../../../components/ConfirmModal/ConfirmModal';

function checkIfRedirect(workspaces: IWorkspace[], id: string | undefined) {
  const activeId = workspaces.filter((val) => val._id === id);
  let pathRedirect = '';

  if (!id && workspaces.length === 0) {
    pathRedirect = `/join?error=${encodeURIComponent('Something went wrong')}`;
  } else if (activeId.length === 0 && workspaces.length > 0) {
    pathRedirect = `/dashboard/${workspaces[0]._id}`;
  }

  return { pathRedirect, activeId: activeId.length > 0 ? activeId[0]._id : '' };
}

function getActiveWorkspace(workspaces: IWorkspace[], activeId: string) {
  const workspaceFiltered = workspaces.filter((val) => val._id === activeId);

  if (workspaceFiltered.length === 1) {
    return workspaceFiltered[0];
  }

  return null;
}

function Dashboard() {
  const { image, display_name, workspaces } =
    useSelector((state: ApplicationState) => state.user.user) ||
    defaultUserData;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string | undefined }>();
  let { pathRedirect, activeId } = checkIfRedirect(workspaces, id);
  const activeWorkspace = getActiveWorkspace(workspaces, activeId);

  function onCreateModalSave(title: string, resetCallback: () => void) {
    createNewWorkspace(title).then((data) => {
      if (data.status && data.data && data.data.status) {
        dispatch(getUserWorkspace(''));
        resetModal();
        resetCallback();
      }
    });
  }

  function onUpdateModalSave(
    title: string,
    _id: string,
    resetCallback: () => void
  ) {
    updateWorkspace(title, _id).then((data) => {
      if (data.status && data.data && data.data.status) {
        dispatch(getUserWorkspace(''));
        resetModal();
        resetCallback();
      }
    });
  }

  function onDeleteModalSave() {
    deleteWorkspace(activeId).then((data) => {
      if (data.status && data.data && data.data.status) {
        dispatch(getUserWorkspace(''));
        setOpenDeleteModal(false);

        if (workspaces.length > 0) {
          pathRedirect = `/dashboard/${workspaces[0]._id}`;
        }
      }
    });
  }

  function resetModal() {
    setOpenModal(false);
    setEditMode(false);
  }

  function onWorkspaceEdit() {
    setEditMode(true);
    setOpenModal(true);
  }

  if (pathRedirect) {
    return <Redirect to={pathRedirect} />;
  }

  return (
    <>
      <div className={classes.Dashboard}>
        <UserLayout profileImage={image} userName={display_name}>
          <Link to={`/dashboard/${activeId}`} className={classes.EpicLogo}>
            <Logo size="medium" />
          </Link>
        </UserLayout>
        <div className={classes.WorkspaceContainer}>
          <WorkspacePanel
            workspaces={workspaces}
            activeId={activeId}
            onAddClick={() => setOpenModal(true)}
          />
          <WorkspaceForm
            workspaceData={activeWorkspace}
            onEdit={onWorkspaceEdit}
            onDelete={() => setOpenDeleteModal(true)}
          />
        </div>
      </div>
      <WorkspaceModal
        activeWorkspace={activeWorkspace}
        open={openModal}
        onClose={resetModal}
        onSave={onCreateModalSave}
        onUpdate={onUpdateModalSave}
        isEdit={isEditMode}
      />

      <ConfirmModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="Delete workspace"
        cancelText="Cancel"
        actionText="Yes, Delete"
        onActionClick={onDeleteModalSave}
      >
        <div className={classes.DeleteDescription}>
          You’re about to delete your Workspace
        </div>
        <div className={classes.DeleteDescription}>
          You’ll lose all forms and responses collected in this Workspace. We
          can’t recover them once you delete.
        </div>
        <div className={classes.DeleteDescription}>
          Are you sure you want to permanently delete this Workspace?
        </div>
      </ConfirmModal>
    </>
  );
}

export default Dashboard;
