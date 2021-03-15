import React from 'react';
import cx from 'classnames';
import IconButton from '../../../../components/IconButton/IconButton';
import CloseSvg from '../../../../svg/CloseSvg';
import classes from './CreateSettings.module.css';
import Input from '../../../../components/Input/Input';
import { IFormSetting } from '../../../../../interfaces/form/form.interface';

interface IProps {
  open: boolean;
  onClose: () => void;
  formSetting: IFormSetting | null;
}

function CreateSettings({ open, onClose, formSetting }: IProps) {
  if (!open || !formSetting) {
    return null;
  }

  const { button_text, description } = formSetting;

  return (
    <div className={classes.CreateSettings}>
      <div className={classes.SettingTitle}>
        <div>Question Settings</div>
        <IconButton customPadding="8px" onClick={onClose}>
          <CloseSvg width={8} height={8} />
        </IconButton>
      </div>
      <div className={classes.SettingPanel}>
        {description && (
          <div className={classes.SettingItem}>
            <div className={classes.SettingLabel}>Description</div>
            <button className={cx(classes.ToggleButton, classes.active)} />
          </div>
        )}
        {button_text && (
          <div className={cx(classes.SettingItem, classes.DirColumn)}>
            <div className={classes.SettingLabel}>Button</div>
            <Input />
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateSettings;
