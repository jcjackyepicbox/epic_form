import React from 'react';
import cx from 'classnames';
import classes from './PreviewButton.module.css';
import BoldCheckSvg from '../../../../../svg/BoldCheckSvg';

type IconButton = 'check';

interface IProps {
  children: React.ReactNode;
  size: 'large' | 'medium';
  icon?: IconButton;
  onClick?: () => void;
  hidden?: boolean;
}

function PreviewButton({ children, size, icon, onClick, hidden }: IProps) {
  const iconComponent = getIconComponent(icon);

  return (
    <div className={classes.PreviewButtonContainer}>
      <button
        onClick={onClick}
        className={cx(classes.PreviewButton, {
          [classes.Large]: size === 'large',
          [classes.Hidden]: hidden === true,
        })}
      >
        <div
          className={cx({
            [classes.PreviewIconExists]: iconComponent !== null,
          })}
        >
          {children}
        </div>
        {iconComponent}
      </button>
    </div>
  );
}

function getIconComponent(icon?: IconButton) {
  if (icon && icon === 'check') {
    return <BoldCheckSvg verticalAlign="middle" />;
  }

  return null;
}

export default PreviewButton;
