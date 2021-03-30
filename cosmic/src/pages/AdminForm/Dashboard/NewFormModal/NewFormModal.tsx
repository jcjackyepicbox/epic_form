import React, { useState } from 'react';
import AdminButton from '../../../../components/AdminButton/AdminButton';
import Modal from '../../../../components/Modal/Modal';
import classes from './NewFormModal.module.css';

interface IProps {
  open: boolean;
  onCloseClick: () => void;
  onSaveClick: (
    title: string,
    purpose: string,
    resetCallback: () => void
  ) => void;
}

function NewFormModal({ open, onCloseClick, onSaveClick }: IProps) {
  const [txtTitle, setTitle] = useState<string>('');
  const [txtPurpose, setPurpose] = useState<string>('');

  function onFormSaveClick() {
    onSaveClick(txtTitle, txtPurpose, () => {
      setTitle('');
      setPurpose('');
    });
  }

  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onCloseClick}>
      <div className={classes.ModalTitle}>Bring your new epicform to life</div>
      <div className={classes.ModalContent}>
        <div className={classes.InputGroup}>
          <label>Form Name</label>
          <input
            type="text"
            placeholder="Name your new epicform"
            value={txtTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={classes.InputGroup}>
          <label>Form Purpose</label>
          <input
            type="text"
            placeholder="What are you creating?"
            value={txtPurpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>
      </div>

      <div className={classes.ModalAction}>
        <AdminButton color="grey" onClick={onCloseClick}>
          Cancel
        </AdminButton>
        <AdminButton
          color="teal"
          disabled={txtTitle === '' || txtPurpose === ''}
          onClick={onFormSaveClick}
        >
          Create
        </AdminButton>
      </div>
    </Modal>
  );
}

export default NewFormModal;
