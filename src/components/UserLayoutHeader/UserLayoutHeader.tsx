import React from 'react';
import classes from './UserLayoutHeader.module.css';

interface IProps {
  children: React.ReactNode;
  profileImage: string;
  userName: string;
}

function UserLayout({ children, profileImage, userName }: IProps) {
  return (
    <header className={classes.UserLayoutHeader}>
      <div className={classes.LayoutSection}>{children}</div>
      <div className={classes.UserSection}>
        <img alt="profile image" src={profileImage} />
        <span>{userName}</span>
      </div>
    </header>
  );
}

export default UserLayout;
