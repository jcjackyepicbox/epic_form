import React, { useState } from 'react';
import cx from 'classnames';
import {
  IFormSetting,
  SETTING_TYPE,
} from '../../../../../../interfaces/form/form.interface';
import IconShortSvg from '../../../../../svg/IconShortSvg';
import IconThankyouSvg from '../../../../../svg/IconThankyouSvg';
import IconWelcomeSvg from '../../../../../svg/IconWelcomeSvg';
import classes from './FieldDropdown.module.css';
import IconButton from '../../../../../components/IconButton/IconButton';
import CloseSvg from '../../../../../svg/CloseSvg';

interface IProps {
  openDropdown: boolean;
  formSettings: IFormSetting[];
  addQuestion: (type_id: SETTING_TYPE) => void;
  onCloseDropdown: () => void;
}

function FieldDropdown({
  openDropdown,
  formSettings,
  addQuestion,
  onCloseDropdown,
}: IProps) {
  const [activeForm, setActiveForm] = useState<IFormSetting | null>(
    formSettings.length > 0 ? formSettings[0] : null
  );

  function onListHover(formSetting: IFormSetting) {
    setActiveForm(formSetting);
  }

  const questionListItems = formSettings.map((val) => {
    const { type_name, icon, type_id, type_color } = val;
    const iconComponent = mapIconCompoennt(icon);
    return (
      <li
        key={type_id}
        className={cx({ [classes.active]: type_id === activeForm?.type_id })}
        onMouseEnter={() => onListHover(val)}
        onClick={() => addQuestion(type_id)}
      >
        <span className={classes.NFListIcon} style={{ background: type_color }}>
          {iconComponent}
        </span>
        <span className={classes.NFListItem}>{type_name}</span>
      </li>
    );
  });

  if (!openDropdown) {
    return null;
  }

  return (
    <div className={classes.NewFieldDropdown}>
      <div className={classes.NewFieldTypeList}>
        <div className={classes.NewFieldTypeTitle}>Choose Question Type</div>
        <ul>{questionListItems}</ul>
      </div>

      <div className={classes.NewFieldTypeDescription}>
        <div className={classes.NewFieldClose}>
          <IconButton onClick={onCloseDropdown}>
            <CloseSvg color="#969696" width={12} height={12} />
          </IconButton>
        </div>
        <div className={classes.DescriptionImage}>
          <img src={activeForm?.type_image} alt={activeForm?.type_name} />
        </div>
        <div className={classes.DescriptionTitle}>{activeForm?.type_name}</div>
        <div className={classes.DescriptionDesc}>{activeForm?.type_desc}</div>
      </div>
    </div>
  );
}

export function mapIconCompoennt(icon_name: string) {
  switch (icon_name) {
    case 'welcome':
      return <IconWelcomeSvg color="#fff" />;
    case 'thankyou':
      return <IconThankyouSvg color="#fff" />;
    case 'short':
      return <IconShortSvg color="#fff" />;
    default:
      return <></>;
  }
}

export default FieldDropdown;
