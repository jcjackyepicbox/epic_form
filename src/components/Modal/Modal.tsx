import React from 'react';
import CloseSvg from '../../svg/CloseSvg';
import IconButton from '../IconButton/IconButton';
import classes from './Modal.module.css';

interface IProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ onClose, children }: IProps) {
  return (
    <div className={classes.Modal}>
      <div className={classes.ModalContainer}>
        <div className={classes.ModalClose}>
          <IconButton onClick={onClose} customPadding="6px">
            <CloseSvg color="#c6c6c6" width={12} height={12} />
          </IconButton>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;
