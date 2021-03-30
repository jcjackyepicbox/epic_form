import React from 'react';
import AdminButton from '../AdminButton/AdminButton';
import Modal from '../Modal/Modal';
import classes from './ConfirmModal.module.css';

interface IProps {
  open: boolean;
  onClose: () => void;
  onActionClick: () => void;
  title: string;
  children: React.ReactNode;
  cancelText: string;
  actionText: string;
}

function ConfirmModal({
  open,
  onClose,
  title,
  children,
  cancelText,
  actionText,
  onActionClick,
}: IProps) {
  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onClose}>
      <div className={classes.ConfirmModalTitle}>{title}</div>
      {children}
      <div className={classes.ModalAction}>
        <AdminButton color="grey" onClick={onClose}>
          {cancelText}
        </AdminButton>
        <AdminButton color="red" onClick={onActionClick}>
          {actionText}
        </AdminButton>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
