import React, { useEffect, useState } from 'react';
import { IWorkspace } from '../../../../../interfaces/redux/user.interface';
import AdminButton from '../../../../components/AdminButton/AdminButton';
import Modal from '../../../../components/Modal/Modal';
import classes from './WorkspaceModal.module.css';

interface IProps {
  open: boolean;
  onClose: () => void;
  onSave: (title: string, resetCallback: () => void) => void;
  onUpdate: (title: string, _id: string, resetCallback: () => void) => void;
  isEdit?: boolean;
  activeWorkspace: IWorkspace | null;
}

function initInputWorkspace(
  activeWorkspace: IWorkspace | null,
  isEdit: boolean | undefined
) {
  if (activeWorkspace !== null && isEdit === true) {
    return activeWorkspace.workspace_name;
  }

  return '';
}

function WorkspaceModal({
  open,
  onClose,
  onSave,
  isEdit,
  activeWorkspace,
  onUpdate,
}: IProps) {
  const [inputWorkspace, setInputWorkspace] = useState<string>(() =>
    initInputWorkspace(activeWorkspace, isEdit)
  );

  useEffect(() => {
    setInputWorkspace(
      activeWorkspace !== null && isEdit ? activeWorkspace.workspace_name : ''
    );
  }, [activeWorkspace, isEdit]);

  if (!open) {
    return null;
  }

  function resetInput() {
    setInputWorkspace('');
  }

  function onSaveClick() {
    if (isEdit && activeWorkspace) {
      onUpdate(inputWorkspace, activeWorkspace._id, resetInput);
    } else {
      onSave(inputWorkspace, resetInput);
    }
  }

  function onCloseClick() {
    onClose();
    resetInput();
  }

  return (
    <Modal onClose={onCloseClick}>
      <div className={classes.ModalTitle}>
        {!isEdit ? 'Create new workspace' : 'Update workspace'}
      </div>
      <div className={classes.ModalContent}>
        <div className={classes.InputGroup}>
          <input
            type="text"
            placeholder="Name your new workspace"
            value={inputWorkspace}
            onChange={(e) => setInputWorkspace(e.target.value)}
          />
        </div>
      </div>

      <div className={classes.ModalAction}>
        <AdminButton color="grey" onClick={onCloseClick}>
          Cancel
        </AdminButton>
        <AdminButton
          color="teal"
          disabled={inputWorkspace === ''}
          onClick={onSaveClick}
        >
          {!isEdit ? 'Create' : 'Update'}
        </AdminButton>
      </div>
    </Modal>
  );
}

export default WorkspaceModal;
