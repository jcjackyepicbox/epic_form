import React from 'react';
import CloseSvg from '../../svg/CloseSvg';
import IconButton from '../IconButton/IconButton';
import classes from './ModalFullPage.module.css';

interface IProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

function ModalFullPage({ children, title, onClose }: IProps) {
  return (
    <div className={classes.ModalFullPage}>
      <div className={classes.ModalBanner}>
        <div className={classes.ModalBannerTitle}>{title}</div>
        <IconButton onClick={onClose}>
          <CloseSvg color="#fff" />
        </IconButton>
      </div>
      <div className={classes.ModalContent}>{children}</div>
    </div>
  );
}

export default ModalFullPage;
